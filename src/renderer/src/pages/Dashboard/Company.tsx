import { Flex, Group, ActionIcon, Title, SimpleGrid, Box } from '@mantine/core'
import { Layout } from '@renderer/components/layouts'
import { IconReload, IconCalendar } from '@tabler/icons-react'
import { useParams } from 'react-router-dom'
import {
  DashToSpace,
  monthsOfYear,
  convertToDate,
  capitalizeFirstLetters
} from '@renderer/services/utils'
import { DatePickerInput } from '@mantine/dates'
import { AddButton, PaperCard, LayoutCard } from '@renderer/components/Button/ActionButtons'
import { useEffect, useState } from 'react'

interface paperType {
  date: Date
  realDate: string
}

export default function Company() {
  let { companyName } = useParams()
  const [localLayouts, setLocalLayouts] = useState({})
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [newspapers, setNewspapers] = useState<paperType[]>([
    {
      date: new Date(),
      realDate: '01-01-2023'
    }
  ])

  // getting data from backend
  const getAllPapers = async () => {
    let papers = await window.api.getPapers(companyName)
    let data: paperType[] = papers.map((realDate: string) => {
      return {
        date: convertToDate(realDate),
        realDate
      }
    })

    setNewspapers(
      data.sort((a, b) => {
        return new Date(b.date) - new Date(a.date)
      })
    )
  }

  //get layout components from localStorage
  const getAllLayout = () => {
    let localData = localStorage.getItem(companyName as string);
    if (localData != null) {
      setLocalLayouts(JSON.parse(localData))
    }
  }

  const filteredNewspapers = newspapers.filter((paper) => {
    if (selectedDate === null) return true // If no date is selected, show all newspapers
    const paperDate = new Date(paper.date)
    return paperDate.toDateString() === selectedDate.toDateString()
  })

  const loadAllData = async() => {
    // loading layouts from firebase
    
  }

  useEffect(() => {
    getAllPapers()
    getAllLayout()
  }, [])

  return (
    <Layout isBack>
      <Flex justify="center" align="center" direction="column">
        <Title order={3} mb={15}>
          {capitalizeFirstLetters(DashToSpace(companyName as string))}
        </Title>
        <Group position="apart" spacing="xl" w="100%">
          <DatePickerInput
            clearable
            icon={<IconCalendar size="1.1rem" stroke={1.5} />}
            dropdownType="modal"
            label="Filter with date"
            placeholder="Pick date"
            onChange={setSelectedDate}
          />
          <ActionIcon
            size="lg"
            variant={'gradient'}
            gradient={{ from: 'black', to: 'gray', deg: 45 }}
            onClick={getAllPapers}
          >
            <IconReload />
          </ActionIcon>
        </Group>
      </Flex>
      <Box my={'lg'}>
        <Title order={4}>Layout</Title>
        <SimpleGrid cols={8} w="100%" spacing={'lg'} mt={20}>
          <AddButton url={`/new-design/${companyName}`} height="150px" />
          {
            Object.keys(localLayouts).map((layout, index)=> {
              return (
                <LayoutCard
                  key={`companyLayout-${index}`}
                  url={`/edit-layout/${companyName}/${layout}`}
                  name={layout}
                />
              )
            })
          }
        </SimpleGrid>

        <Title order={4} mt={30}>
          Newspapers
        </Title>
        <SimpleGrid cols={8} w="100%" spacing={'lg'} mt={20}>
          <AddButton url={`/new-pdf/${companyName}`} height="150px" />
          {filteredNewspapers.map((paper, index) => {
            return (
              <PaperCard
                key={`company-${index}`}
                url={`/edit-pdf/${companyName}/${paper.realDate}`}
                date={paper.date.getDate()}
                month={`${monthsOfYear[paper.date.getMonth()]}`}
              />
            )
          })}
        </SimpleGrid>
      </Box>
    </Layout>
  )
}
