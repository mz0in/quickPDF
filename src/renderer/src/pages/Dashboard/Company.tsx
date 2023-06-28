import { Flex, Group, ActionIcon, Title, SimpleGrid, Box } from '@mantine/core'
import { Layout } from '@renderer/components/layouts'
import { IconReload, IconCalendar } from '@tabler/icons-react'
import { useParams } from 'react-router-dom'
import { DashToSpace, monthsOfYear, convertToDate} from '@renderer/services/utils'
import { DatePickerInput } from '@mantine/dates'
import { AddButton, PaperCard } from '@renderer/components/Button/ActionButtons'
import { useEffect, useState } from 'react'

interface paperType {
  date: Date
  realDate: string
}

export default function Company() {
  let { companyName } = useParams()
  const [newspapers, setNewspapers] = useState<paperType[]>([
    {
      date: new Date(),
      realDate: "01-01-2023"
    }
  ])

  console.log(newspapers)

  const getAllPapers = async () => {
    let papers = await window.api.getPapers(companyName)
    let data: paperType[] = papers.map((realDate: string)=> {
      return {
        date: convertToDate(realDate),
        realDate
      } 
    })
   
    setNewspapers(data.sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    }));
  }

  useEffect(() => {
    getAllPapers()
  }, [])

  return (
    <Layout isBack>
      <Flex justify="center" align="center" direction="column">
        <Title order={3} mb={15}>
          {DashToSpace(companyName as string)}
        </Title>
        <Group position="apart" spacing="xl" w="100%">
          <DatePickerInput
            clearable
            icon={<IconCalendar size="1.1rem" stroke={1.5} />}
            dropdownType="modal"
            label="Filter with date"
            placeholder="Pick date"
            // value={value}
            // onChange={setValue}
          />
          <ActionIcon size="lg" variant={'gradient'} onClick={getAllPapers}>
            <IconReload />
          </ActionIcon>
        </Group>
      </Flex>
      <Box my={'lg'}>
        <Title order={4}>Layout</Title>
        <SimpleGrid cols={8} w="100%" spacing={'lg'} mt={20}>
          <AddButton url={`/new-design/${companyName}`} height="150px" />
        </SimpleGrid>

        <Title order={4} mt={30}>
          Newspapers
        </Title>
        <SimpleGrid cols={8} w="100%" spacing={'lg'} mt={20}>
          <AddButton url={`/new-pdf/${companyName}`} height="150px" />
          {newspapers.map((paper, index) => {
            return <PaperCard key={`company-${index}`} url={`/edit-pdf/${companyName}/${paper.realDate}`} date={paper.date.getDate()} month={`${monthsOfYear[paper.date.getMonth()]}`} />
          })}
        </SimpleGrid>
      </Box>
    </Layout>
  )
}
