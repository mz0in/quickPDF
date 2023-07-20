import { useEffect, useState } from 'react'
import { Layout } from '@renderer/components/layouts'
import { Flex, Input, SimpleGrid, Group } from '@mantine/core'
import { IconFolderSearch } from '@renderer/components/icons'
import { AddButton, PdfCompanyCard } from '@renderer/components/Button/ActionButtons'
import { getHttpImage } from '@renderer/services/utils'
import { query, collection, getDocs } from 'firebase/firestore'
import { fireStore } from '@renderer/services/firebase'
import { useAdminChecker } from '@renderer/services/hooks'
import ReloadButton from '@renderer/components/Button/ReloadButton'

interface Company {
  id: string
  name: string
  logo: string
  mobileNumber: string
  owner: string
  type: string
  address: string
}

export default function Home(): JSX.Element {
  const [allCompanies, setAllCompanies] = useState<Company[] | undefined>(undefined)
  const [userInput, setUserInput] = useState<string>('')
  const [isAdmin] = useAdminChecker()
  const [dataFetched, setDataFetched] = useState<boolean>(false)

  // Fetches all companies from Firebase Firestore
  const syncAllCompanies = async (): Promise<void> => {
    try {
      console.log('Fetching papers')
      const companiesCollection = query(collection(fireStore, 'papers'))
      const snapshot = await getDocs(companiesCollection)
      const companies: Company[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().name,
        logo: doc.data().logo,
        mobileNumber: doc.data().mobileNumber,
        owner: doc.data().owner,
        type: doc.data().type,
        address: doc.data().address
      }))
      console.log('Fetched papers', companies)

      // Get local user data from localStorage
      const localData = localStorage.getItem('user')
      const localUserPaper = localData ? JSON.parse(localData) : null

      if (localUserPaper) {
        console.log('Working')
        const usersProject = companies.filter((item) => localUserPaper.papers.includes(item.id))
        console.log('Worked', usersProject)
        setAllCompanies(usersProject)
        // @ts-ignore db is defined in the preload of ElectronJS
        await window?.DB?.setData('company', 'companies', usersProject)
        setDataFetched(true)
      }
    } catch (error: any) {
      console.log(error)
    }
  }

  // Fetch data from Electron Storage
  const getDataFromBackend = async (): Promise<void> => {
    console.log('Get data')
    // @ts-ignore db is defined in the preload of ElectronJS
    const data: Company[] | undefined = await window?.DB?.getData('company', 'companies')
    if (!data) {
      syncAllCompanies()
    }
    if (data) {
      setAllCompanies(data)
      setDataFetched(true)
    }
  }

  // Filter companies based on user input
  function filterCompanies(allCompanies: Company[] | undefined, userInput: string): Company[] {
    if (!allCompanies) {
      return []
    }
    const searchTerm = userInput.toLowerCase()
    return allCompanies.filter((company) => company.name.toLowerCase().includes(searchTerm))
  }

  const filteredCompanies = filterCompanies(allCompanies, userInput)
  console.log('Home page mount', allCompanies)

  useEffect(() => {
    getDataFromBackend()
    // Checking for admin user;
  }, [])

  // If data is not fetched yet, return null or loading component
  if (!dataFetched) {
    return <p>loading</p>
  }

  return (
    <Layout>
      <Flex justify="center" align="center" direction="column">
        <p>Newspapers</p>
        <Group w="100%">
          <Input
            w="95%"
            placeholder="Enter newspaper name"
            rightSection={
              <IconFolderSearch size="1rem" style={{ display: 'block', opacity: 0.5 }} />
            }
            onChange={(e): any => setUserInput(e.target.value)}
          />
          <ReloadButton onClickFunction={syncAllCompanies} />
        </Group>
      </Flex>
      <SimpleGrid cols={8} w="100%" spacing="lg" mt={60}>
        {/* Use the logical AND (&&) to conditionally render the AddButton */}
        {isAdmin && <AddButton url="/company" />}

        {/* Check if allCompanies is defined before mapping */}
        {allCompanies &&
          filteredCompanies.map((company) => (
            <PdfCompanyCard key={company.id} id={company.id} logo={getHttpImage(company.logo)} />
          ))}
      </SimpleGrid>
    </Layout>
  )
}
