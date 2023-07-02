import { Layout } from '@renderer/components/layouts'
import { Flex, Input, SimpleGrid, Group, LoadingOverlay } from '@mantine/core'
import { IconFolderSearch } from '@renderer/components/icons'
import { AddButton, PdfCompanyCard } from '@renderer/components/Button/ActionButtons'
import { getHttpImage } from '@renderer/services/utils'
import { query, collection, getDocs } from 'firebase/firestore'
import { fireStore } from '@renderer/services/firebase'
import { useEffect, useState } from 'react'
import { useAdminChecker } from '@renderer/services/hooks'
import ReloadButton from '@renderer/components/Button/ReloadButton'

export default function Home() {
  const [allCompany, setAllCompany] = useState<any>()
  const [userInput, setUserInput] = useState('')
  const [isAdmin] = useAdminChecker()
  const [dataFetched, setDataFetched] = useState(false) // New state variable

  const syncAllCompany = async () => {
    try {
      // loading all companies
      console.log("fetching papers")
      const companiesCollection = query(collection(fireStore, 'papers'))
      const snapshot = await getDocs(companiesCollection)
      const companies = snapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().name,
        logo: doc.data().logo,
        mobileNumber: doc.data().mobileNumber,
        owner: doc.data().owner,
        type: doc.data().type,
        address: doc.data().address
      }))
      console.log("fatched papers", companies);
      let localData = localStorage.getItem('user') as string
      let localUserPaper = JSON.parse(localData)
      console.log('localUserPaper', localUserPaper)
      if (localUserPaper != undefined) {
        console.log('working')
        let usersProject = companies.filter((item) => localUserPaper.papers.includes(item.id))
        console.log('worked', usersProject)
        setAllCompany(usersProject)
        // @ts-ignore
        await window?.DB?.setData('company', 'companies', usersProject)
        setDataFetched(true)
      }
    } catch (error: any) {
      console.log(error)
    }
  }

  const getDataFromIdbStorage = async () => {
    console.log("get data")
    //@ts-ignore
    let data: any = await window?.DB?.getData('company', 'companies')
    if (data === undefined) {
      syncAllCompany()
    }
    if (data !== null) {
      setAllCompany(data)
      setDataFetched(true) // Set dataFetched to true after data is fetched
    }
  }

  function filterCompanies(allCompanies: any[], userInput: string): any[] {
    if (allCompanies === undefined) {
      return [] // Return an empty array if allCompanies is undefined
    }
    const searchTerm = userInput.toLowerCase()
    return allCompanies.filter((company) => company.name.toLowerCase().includes(searchTerm))
  }

  const filteredCompanies = filterCompanies(allCompany, userInput)
  console.log("home page mount", allCompany)

  useEffect(() => {
    getDataFromIdbStorage()
    //checking for admin user;
  }, [])

  if (!dataFetched) {
    return <LoadingOverlay visible={true} />
  }

  return (
    <Layout>
      <Flex justify="center" align="center" direction="column">
        <p>Newspapers</p>
        <Group w={'100%'}>
          <Input
            w={'95%'}
            placeholder="enter newspaper name"
            rightSection={
              <IconFolderSearch size="1rem" style={{ display: 'block', opacity: 0.5 }} />
            }
            onChange={(e) => setUserInput(e.target.value)}
          />
          <ReloadButton onClick={syncAllCompany} />
        </Group>
      </Flex>
      <SimpleGrid cols={8} w="100%" spacing={'lg'} mt={60}>
        {isAdmin ? <AddButton url="/company" /> : null}

        {allCompany !== undefined
          ? filteredCompanies.map((company: any) => {
              return (
                <PdfCompanyCard
                  key={company.id}
                  id={company.id}
                  logo={getHttpImage(company.logo)}
                />
              )
            })
          : null}
      </SimpleGrid>
    </Layout>
  )
}
