"use client"

import { formatRegularEmployeeData, formatSubstituteEmployeeData, formatHolidayData, formatLeaveData } from "@/services";

const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
    isSidebarOpen: false,
    isPageLoading: false,
    pendingLeave: null,
    allLeaves: null,
    employee: {
        regular: null,
        substitute: null,
    },
    holidays: null,
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

        // Pending Leave Data ==========================================================
        setPendingLeaves: (state, action) => {
            const formatedData = formatLeaveData(action.payload)
            state.pendingLeave = formatedData
        },
        addPendingLeave: (state, action) => {
            if (action.payload?.status === 0) {
                state.pendingLeave.push(action.payload)
                const formatedData = formatLeaveData(state.pendingLeave)
                state.pendingLeave = formatedData
            }
        },
        editPendingLeave: (state, action) => {
            if (action.payload?.status === 0) {
                const data = state.pendingLeave.filter((item) => item._id !== action.payload._id)
                data.push(action.payload)
                const formatedData = formatLeaveData(data)
                state.pendingLeave = formatedData
            } else {
                const data = state.pendingLeave.filter((item) => item._id !== action.payload._id)
                const formatedData = formatLeaveData(data)
                state.pendingLeave = formatedData
            }
        },
        deletePendingLeave: (state, action) => {
            const data = state.pendingLeave.filter((item) => item._id !== action.payload._id)
            const formatedData = formatLeaveData(data)
            state.pendingLeave = formatedData
        },

        // All Leaves ==========================================================
        setLeaves: (state, action) => {
            const formatedData = formatLeaveData(action.payload)
            state.allLeaves = formatedData
        },
        cancelLeave: (state, action) => {
            const data = state.allLeaves.filter((item) => item._id !== action.payload._id)
            const formatedData = formatLeaveData(data)
            state.allLeaves = formatedData
        },

        // Regular employee =============================
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
            state.holidays = formatedData
        },
        addHoliday: (state, action) => {
            state.holiday.push(action.payload)
            const formatedData = formatHolidayData(state.holiday)
            state.holidays = formatedData
        },
        editHoliday: (state, action) => {
            const data = state.holiday.filter((item) => item._id !== action.payload._id)
            data.push(action.payload)
            const formatedData = formatHolidayData(data)
            state.holidays = formatedData
        },
        deleteHoliday: (state, action) => {
            const data = state.holiday.filter((item) => item._id !== action.payload._id)
            const formatedData = formatHolidayData(data)
            state.holidays = formatedData
        },
    }
})

export const {
    setSideBarOpen, setPageLoading,
    setPendingLeaves, addPendingLeave, editPendingLeave, deletePendingLeave, setLeaves, cancelLeave,
    setRegularEmployee, addRegularEmployee, editRegularEmployee, deleteRegularEmployee,
    setSubstituteEmployee, addSubstituteEmployee, editSubstituteEmployee, deleteSubstituteEmployee,
    setHoliday, addHoliday, editHoliday, deleteHoliday,
} = commonSlice.actions
export default commonSlice.reducer