"use client"

const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
    isSidebarOpen: false,
    isPageLoading: false,
    pendingLeave:[],
    employee:{
        regular:[],
        substitute:[],
    }
}


const commonSlice = createSlice({
    name: 'common',
    initialState,
    reducers: {
        setSideBarOpen: (state, action) => {
            state.isSidebarOpen = action.payload
        },
        setPageLoading: (state, action) => {
            state.isPageLoading = action.payload
        },
        setPendingLeave: (state, action) => {
            state.pendingLeave = action.payload
        },
        editPendingLeave: (state, action) => {
            const data = state.pendingLeave.filter((item) => item._id !== action.payload._id)
            data.push(action.payload)
            state.pendingLeave = data
        },
        deletePendingLeave: (state, action) => {
            state.pendingLeave = state.pendingLeave.filter((item) => item._id !== action.payload._id)
        },
        setRegularEmployee: (state, action) => {
            state.employee.regular = action.payload
        },
        editRegularEmployee: (state, action) => {
            const data = state.employee.regular.filter((item) => item._id !== action.payload._id)
            data.push(action.payload)
            state.employee.regular = data
        },
        deleteRegularEmployee: (state, action) => {
            state.employee.regular = state.employee.regular.filter((item) => item._id !== action.payload._id)
        },
        setSubstituteEmployee: (state, action) => {
            state.employee.substitute = action.payload
        },
        editSubstituteEmployee: (state, action) => {
            const data = state.employee.substitute.filter((item) => item._id !== action.payload._id)
            data.push(action.payload)
            state.employee.substitute = data
        },
        deleteSubstituteEmployee: (state, action) => {
            state.employee.substitute = state.employee.substitute.filter((item) => item._id !== action.payload._id)
        },
    }
})

export const {
    setSideBarOpen, setPageLoading, setPendingLeave, editPendingLeave, deletePendingLeave,
    setRegularEmployee, editRegularEmployee, deleteRegularEmployee, setSubstituteEmployee, 
    editSubstituteEmployee, deleteSubstituteEmployee,
} = commonSlice.actions
export default commonSlice.reducer