import { Flex, Group, Title, SimpleGrid, Box } from '@mantine/core'
import { Layout } from '@renderer/components/layouts'
import { IconCalendar } from '@renderer/components/icons'
import { useParams } from 'react-router-dom'
import {
  DashToSpace,
  monthsOfYear,
  convertToDate,
  capitalizeFirstLetters
} from '@renderer/services/utils'
import { fireStore } from '@renderer/services/firebase'
import { doc, getDoc } from 'firebase/firestore'
import { DatePickerInput } from '@mantine/dates'
import { AddButton, PaperCard, LayoutCard } from '@renderer/components/Button/ActionButtons'
import { useEffect, useState } from 'react'
import ReloadButton from '@renderer/components/Button/ReloadButton'

interface PaperType {
  date: Date
  realDate: string
}

export default function Company(): JSX.Element {
  const { companyName } = useParams<{ companyName: string }>()
  const [localLayouts, setLocalLayouts] = useState<{ [key: string]: any }>({})
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [newspapers, setNewspapers] = useState<PaperType[]>([
    {
      date: new Date(),
      realDate: '01-01-2023'
    }
  ])

  // Function to get all papers from the backend
  const getAllPapers = async (): Promise<void> => {
    try {
      // @ts-ignore API is defined in the Electron preload
      const papers = await window.api.getPapers(companyName)
      const data: PaperType[] = papers.map((realDate: string) => ({
        date: convertToDate(realDate),
        realDate
      }))

      setNewspapers(
        data.sort((a, b) => {
          return b.date.getTime() - a.date.getTime()
        })
      )
    } catch (error) {
      console.error('Failed to fetch papers:', error)
    }
  }

  // Function to get all layout components from localStorage
  const getAllLayout = (): void => {
    const localData = localStorage.getItem(companyName as string)
    if (localData !== null) {
      setLocalLayouts(JSON.parse(localData))
    }
  }

  // Function to filter newspapers based on selected date
  const filteredNewspapers = newspapers.filter((paper) => {
    if (selectedDate === null) return true // If no date is selected, show all newspapers
    return paper.date.toDateString() === selectedDate.toDateString()
  })

  // Function to load all data (layouts and papers) from Firebase
  const loadAllData = async (): Promise<void> => {
    try {
      // Load layouts from Firebase
      const docRef = doc(fireStore, 'papers', companyName as string)
      const docSnap = await getDoc(docRef)
      const layouts = docSnap.data()?.layouts
      if (layouts !== undefined) {
        localStorage.setItem(companyName as string, JSON.stringify(layouts))
        setLocalLayouts(layouts)
      } else {
        console.log('No layouts found')
      }
      getAllPapers()
    } catch (error) {
      console.error('Failed to load data:', error)
    }
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
            icon={<IconCalendar />}
            dropdownType="modal"
            label="Filter with date"
            placeholder="Pick date"
            value={selectedDate}
            onChange={setSelectedDate}
          />
          <ReloadButton onClickFunction={loadAllData} />
        </Group>
      </Flex>
      <Box my="lg">
        <Title order={4}>Layout</Title>
        <SimpleGrid cols={8} w="100%" spacing="lg" mt={20}>
          <AddButton url={`/new-design/${companyName}`} height="150px" />
          {Object.keys(localLayouts).map((layout, index) => (
            <LayoutCard
              key={`companyLayout-${index}`}
              url={`/edit-layout/${companyName}/${layout}`}
              name={layout}
            />
          ))}
        </SimpleGrid>

        <Title order={4} mt={30}>
          Newspapers
        </Title>
        <SimpleGrid cols={8} w="100%" spacing="lg" mt={20}>
          <AddButton url={`/new-pdf/${companyName}`} height="150px" />
          {filteredNewspapers.map((paper, index) => (
            <PaperCard
              key={`company-${index}`}
              url={`/edit-pdf/${companyName}/${paper.realDate}`}
              date={paper.date.getDate()}
              month={monthsOfYear[paper.date.getMonth()]}
            />
          ))}
        </SimpleGrid>
      </Box>
    </Layout>
  )
}
