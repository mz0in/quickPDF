import { Layout } from '@renderer/components/layouts'
import { Flex, Input, SimpleGrid, ActionIcon, Group } from '@mantine/core'
import { IconFolderSearch, IconReload } from '@tabler/icons-react'
import { AddButton, PdfCompanyCard } from '@renderer/components/Button/ActionButtons'
import { getHttpImage } from '@renderer/services/utils'
import type { RootState } from '../../store'
import { useSelector, useDispatch } from 'react-redux'
import { fetchCompanies, addCompany } from '@renderer/services/redux/allCompanies'
import { AppDispatch } from '../../store'
import { unwrapResult } from '@reduxjs/toolkit'
import { useEffect, useState } from 'react'
import { useAdminChecker } from '@renderer/services/hooks'

export default function Home() {
  const allCompany = useSelector((state: RootState) => state.companies.companies)
  const dispatch = useDispatch<AppDispatch>()
  const [userInput, setUserInput] = useState('')
  const [isAdmin] = useAdminChecker()

  const syncAllCompany = () => {
    dispatch(fetchCompanies())
      .then(unwrapResult)
      .then(async (res) => {
        await window?.DB?.setData('company', 'companies', res)
      })
  }

  const getDataFromIdbStorage = async () => {
    let data: any = await window?.DB?.getData('company', 'companies')
    if (data !== null) {
      dispatch(addCompany(data))
    }
  }

  function filterCompanies(allCompanies: any[], userInput: string): any[] {
    const searchTerm = userInput.toLowerCase()
    return allCompanies.filter((company) => company.name.toLowerCase().includes(searchTerm))
  }

  const filteredCompanies = filterCompanies(allCompany, userInput)

  useEffect(() => {
    getDataFromIdbStorage()

    //checking for admin user;
  }, [])

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
          <ActionIcon
            variant={'gradient'}
            gradient={{ from: 'black', to: 'gray', deg: 45 }}
            p={5}
            size="lg"
            onClick={syncAllCompany}
          >
            <IconReload />
          </ActionIcon>
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
