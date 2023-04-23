import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fireStore } from '@renderer/services/firebase'
import { collection, query, getDocs } from 'firebase/firestore'

export interface Company {
  id: string
  name: string
  logo: string
  mobileNumber: number
  owner: string
  type: string
  address: string
}

interface CompaniesState {
  companies: Company[]
}

const initialState: CompaniesState = {
  companies: []
}

export const fetchCompanies = createAsyncThunk<Company[], void, { rejectValue: string }>(
  'companies/fetchCompanies',
  async (_, { rejectWithValue }) => {
    try {
      const companiesCollection = query(collection(fireStore, 'company'))
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
      console.log(companies)
      return companies
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
)

export const companiesSlice = createSlice({
  name: 'companies',
  initialState,
  reducers: {
    addCompany: (state, action: any) => {
      state.companies = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCompanies.fulfilled, (state, action: any) => {
      state.companies = action.payload
    })
  }
})

export const { addCompany } = companiesSlice.actions
export default companiesSlice.reducer
