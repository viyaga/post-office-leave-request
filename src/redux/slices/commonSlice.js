"use client"

import { formatRegularEmployeeData, formatSubstituteEmployeeData, formatHolidayData, formatLeaveData } from "@/services";

const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
    isSidebarOpen: false,
    isDashboardLoading: true,
    pendingLeave: [],
    allLeaves: [],
    employee: {
        regular: [],
        substitute: [],
    },
    holidays: [],
}


const commonSlice = createSlice({
    name: 'common',
    initialState,
    reducers: {
        setSideBarOpen: (state, action) => {
            state.isSidebarOpen = action.payload
        },
        setDashboardLoading: (state, action) => {
            state.isDashboardLoading = action.payload
        },

        // Pending Leave Data ==========================================================
        setPendingLeaves: (state, action) => {
            const formatedData = formatLeaveData(action.payload)
            state.pendingLeave = formatedData
            state.isDashboardLoading = false
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
            state.isDashboardLoading = false
        },
        cancelLeave: (state, action) => {
            const data = state.allLeaves.filter((item) => item._id !== action.payload._id)
            const formatedData = formatLeaveData(data)
            state.allLeaves = formatedData

            state.pendingLeave.push(action.payload)
            const formatedData1 = formatLeaveData(state.pendingLeave)
            state.pendingLeave = formatedData1
        },

        // Regular employee =============================
        setRegularEmployee: (state, action) => {
            const formatedData = formatRegularEmployeeData(action.payload)
            state.employee.regular = formatedData
            state.isDashboardLoading = false
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
            state.isDashboardLoading = false
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
            state.isDashboardLoading = false
        },
        addHoliday: (state, action) => {
            state.holidays.push(action.payload)
            const formatedData = formatHolidayData(state.holiday)
            state.holidays = formatedData
        },
        editHoliday: (state, action) => {
            const data = state.holidays.filter((item) => item._id !== action.payload._id)
            data.push(action.payload)
            const formatedData = formatHolidayData(data)
            state.holidays = formatedData
        },
        deleteHoliday: (state, action) => {
            const data = state.holidays.filter((item) => item._id !== action.payload._id)
            const formatedData = formatHolidayData(data)
            state.holidays = formatedData
        },
    }
})

export const {
    setSideBarOpen, setDashboardLoading,
    setPendingLeaves, addPendingLeave, editPendingLeave, deletePendingLeave, setLeaves, cancelLeave,
    setRegularEmployee, addRegularEmployee, editRegularEmployee, deleteRegularEmployee,
    setSubstituteEmployee, addSubstituteEmployee, editSubstituteEmployee, deleteSubstituteEmployee,
    setHoliday, addHoliday, editHoliday, deleteHoliday,
} = commonSlice.actions
export default commonSlice.reducer