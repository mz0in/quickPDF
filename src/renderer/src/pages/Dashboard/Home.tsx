import Layout from '@renderer/components/layouts'
import { Flex, Input, SimpleGrid, ActionIcon, Group } from '@mantine/core'
import { IconFolderSearch, IconReload } from '@tabler/icons-react'
import { AddButton, PdfCompanyCard } from '@renderer/components/Button/ActionButtons'
import { getHttpImage } from '@renderer/services/utils'
import type { RootState } from '../../store'
import { useSelector, useDispatch } from 'react-redux'
import { fetchCompanies, addCompany } from '@renderer/services/redux/allCompanies'
import { AppDispatch } from '../../store'
import { unwrapResult } from '@reduxjs/toolkit'
import { useEffect } from 'react'
import { useAdminChecker } from '@renderer/services/hooks'

export default function Home() {
  const allCompnay = useSelector((state: RootState) => state.companies.companies)
  const dispatch = useDispatch<AppDispatch>()
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
    console.log(data)
    if (data !== null) {
      dispatch(addCompany(data))
    }
  }

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
          />
          <ActionIcon variant={'gradient'} p={5} size="lg" onClick={syncAllCompany}>
            <IconReload />
          </ActionIcon>
        </Group>
      </Flex>
      <SimpleGrid cols={8} w="100%" spacing={'lg'} mt={60}>
        {isAdmin ? <AddButton url="/company" /> : null}

        {allCompnay !== undefined
          ? Object.values(allCompnay).map((company: any) => {
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
