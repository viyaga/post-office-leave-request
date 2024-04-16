"use client"

import { addIdToDataGridRows, formatRegularEmployeeData } from "@/services";

const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
    isSidebarOpen: false,
    isPageLoading: false,
    pendingLeave: [],
    employee: {
        regular: [],
        substitute: [],
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
        addPendingLeave: (state, action) => {
            state.pendingLeave = state.pendingLeave.push(action.payload)
        },
        editPendingLeave: (state, action) => {
            const data = state.pendingLeave.filter((item) => item._id !== action.payload._id)
            data.push(action.payload)
            state.pendingLeave = data
        },
        deletePendingLeave: (state, action) => {
            const leaveData = state.pendingLeave.filter((item) => item._id !== action.payload)
            state.pendingLeave = addIdToDataGridRows(leaveData)
        },
        setRegularEmployee: (state, action) => {
            const formatedData = formatRegularEmployeeData(action.payload)
            state.employee.regular = formatedData
        },
        addRegularEmployee: (state, action) => {
            state.employee.regular.push(action.payload)
            const formatedData = formatRegularEmployeeData(state.employee.regular)
            state.employee.regular = formatedData
        },
        editRegularEmployee: (state, action) => {
            const data = state.employee.regular.filter((item) => item._id !== action.payload._id)
            data.push(action.payload)
            const formatedData = formatRegularEmployeeData(data)
            state.employee.regular = formatedData
        },
        deleteRegularEmployee: (state, action) => {
            const data = state.employee.regular.filter((item) => item._id !== action.payload._id)
            const formatedData = formatRegularEmployeeData(data)
            state.employee.regular = formatedData
        },
        setSubstituteEmployee: (state, action) => {
            state.employee.substitute = action.payload
        },
        addSubstituteEmployee: (state, action) => {
            state.employee.substitute = state.employee.substitute.push(action.payload)
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
    setSideBarOpen, setPageLoading,
    setPendingLeave, addPendingLeave, editPendingLeave, deletePendingLeave,
    setRegularEmployee, addRegularEmployee, editRegularEmployee, deleteRegularEmployee,
    setSubstituteEmployee, addSubstituteEmployee, editSubstituteEmployee, deleteSubstituteEmployee,
} = commonSlice.actions
export default commonSlice.reducer