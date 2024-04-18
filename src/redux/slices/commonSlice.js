"use client"

import { addIdToDataGridRows, formatRegularEmployeeData, formatSubstituteEmployeeData, formatHolidayData } from "@/services";

const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
    isSidebarOpen: false,
    isPageLoading: false,
    pendingLeave: [],
    employee: {
        regular: [],
        substitute: [],
    },
    holiday: [],
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

        // regular employee =============================
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

        // substitute employee ================================================
        setSubstituteEmployee: (state, action) => {
            const formatedData = formatSubstituteEmployeeData(action.payload)
            state.employee.substitute = formatedData
        },
        addSubstituteEmployee: (state, action) => {
            state.employee.substitute.push(action.payload)
            const formatedData = formatSubstituteEmployeeData(state.employee.substitute)
            state.employee.substitute = formatedData
        },
        editSubstituteEmployee: (state, action) => {
            const data = state.employee.substitute.filter((item) => item._id !== action.payload._id)
            data.push(action.payload)
            const formatedData = formatSubstituteEmployeeData(data)
            state.employee.substitute = formatedData
        },
        deleteSubstituteEmployee: (state, action) => {
            const data = state.employee.substitute.filter((item) => item._id !== action.payload._id)
            const formatedData = formatSubstituteEmployeeData(data)
            state.employee.substitute = formatedData
        },

        //holidays ============================================================
        setHoliday: (state, action) => {
            const formatedData = formatHolidayData(action.payload)
            state.holiday = formatedData
        },
        addHoliday: (state, action) => {
            state.holiday.push(action.payload)
            const formatedData = formatHolidayData(state.holiday)
            console.log({ formatedData: action.payload });
            state.holiday = formatedData
        },
        editHoliday: (state, action) => {
            const data = state.holiday.filter((item) => item._id !== action.payload._id)
            data.push(action.payload)
            const formatedData = formatHolidayData(data)
            state.holiday = formatedData
        },
        deleteHoliday: (state, action) => {
            const data = state.holiday.filter((item) => item._id !== action.payload._id)
            const formatedData = formatHolidayData(data)
            state.holiday = formatedData
        },
    }
})

export const {
    setSideBarOpen, setPageLoading,
    setPendingLeave, addPendingLeave, editPendingLeave, deletePendingLeave,
    setRegularEmployee, addRegularEmployee, editRegularEmployee, deleteRegularEmployee,
    setSubstituteEmployee, addSubstituteEmployee, editSubstituteEmployee, deleteSubstituteEmployee,
    setHoliday, addHoliday, editHoliday, deleteHoliday,
} = commonSlice.actions
export default commonSlice.reducer