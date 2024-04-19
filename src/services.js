import axios from 'axios';

const PUBLIC_SERVER_ONE = process.env.NEXT_PUBLIC_SERVER_ONE

const errResponse = (error) => {
    const message = (error.response && error.response.data && error.response.data.message)
        || error.message || error.toString()
    return message
}

const textCapitalize = (text) => {
    // .split(/[ .]/)
    var sentence = text.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
    sentence = sentence.split('.').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('.')
    return sentence
}

const addIdToDataGridRows = (data) => {
    return data.map((item, index) => ({ ...item, id: index + 1 }))
}

const findNumberOfDays = (fromDate, toDate) => {
    const differenceInMs = toDate - fromDate;
    const differenceInDays = differenceInMs / (1000 * 60 * 60 * 24);    // Convert milliseconds to days
    const days = Math.round(differenceInDays) + 1
    return days
}

// Regular Employees ====================================================================
const REGULAR_EMPLOYEE_API = PUBLIC_SERVER_ONE + '/employee/regular'

const getAllRegularEmployeesData = async () => {
    try {
        const response = await axios.get(REGULAR_EMPLOYEE_API)
        const employees = response.data.employees
        return { employees }
    } catch (error) {
        return { error: errResponse(error) }
    }
}

const createRegularEmployeeData = async (regularEmployeeData) => {
    try {
        const response = await axios.post(REGULAR_EMPLOYEE_API, regularEmployeeData)
        const { message, employee } = response.data
        return { success: message, employee }
    } catch (error) {
        return { error: errResponse(error) }
    }
}


const updateRegularEmployeeData = async (id, regularEmployeeData) => {
    try {
        const response = await axios.put(`${REGULAR_EMPLOYEE_API}/${id}`, regularEmployeeData)
        const { message, employee } = response.data
        return { success: message, employee }
    } catch (error) {
        return { error: errResponse(error) }
    }
}


const deleteRegularEmployeeData = async (id) => {
    try {
        const response = await axios.delete(`${REGULAR_EMPLOYEE_API}/${id}`)
        const { message, employee } = response.data
        return { success: message, employee }
    } catch (error) {
        return { error: errResponse(error) }
    }
}

const formatRegularEmployeeData = (regularEmployeeData) => {
    const sortedData = regularEmployeeData.sort((a, b) => {
        return a.officeName.localeCompare(b.officeName);
    });

    const idAddedData = addIdToDataGridRows(sortedData)
    return idAddedData
}

// Substitute services ======================================================
const SUBSTITUTE_API = PUBLIC_SERVER_ONE + '/employee/substitute'

const getAllSubstituteEmployeesData = async () => {
    try {
        const response = await axios.get(SUBSTITUTE_API)
        const employees = response.data.employees
        return { employees }
    } catch (error) {
        return { error: errResponse(error) }
    }
}

const createSubstituteEmployeeData = async (substituteEmployeeData) => {
    try {
        const response = await axios.post(SUBSTITUTE_API, substituteEmployeeData)
        const { message, employee } = response.data
        return { success: message, employee }
    } catch (error) {
        return { error: errResponse(error) }
    }
}


const updateSubstituteEmployeeData = async (id, substituteEmployeeData) => {
    try {
        const response = await axios.put(`${SUBSTITUTE_API}/${id}`, substituteEmployeeData)
        const { message, employee } = response.data
        return { success: message, employee }
    } catch (error) {
        return { error: errResponse(error) }
    }
}


const deleteSubstituteEmployeeData = async (id) => {
    try {
        const response = await axios.delete(`${SUBSTITUTE_API}/${id}`)
        const { message, employee } = response.data
        return { success: message, employee }
    } catch (error) {
        return { error: errResponse(error) }
    }
}

const formatSubstituteEmployeeData = (substituteEmployeeData) => {
    const sortedData = substituteEmployeeData.sort((a, b) => {
        return a.name.localeCompare(b.name);
    });

    const idAddedData = addIdToDataGridRows(sortedData)
    return idAddedData
}

// Holidays ======================================================
const HOLIDAY_API = PUBLIC_SERVER_ONE + '/holiday'

const getAllHolidayData = async () => {
    try {
        const response = await axios.get(HOLIDAY_API)
        const holidays = response.data.holidays
        return { holidays }
    } catch (error) {
        return { error: errResponse(error) }
    }
}

const createHolidayData = async (HolidayData) => {
    try {
        const response = await axios.post(HOLIDAY_API, HolidayData)
        const { message, holiday } = response.data
        return { success: message, holiday }
    } catch (error) {
        return { error: errResponse(error) }
    }
}


const updateHolidayData = async (id, HolidayData) => {
    try {
        const response = await axios.put(`${HOLIDAY_API}/${id}`, HolidayData)
        const { message, holiday } = response.data
        return { success: message, holiday }
    } catch (error) {
        return { error: errResponse(error) }
    }
}


const deleteHolidayData = async (id) => {
    try {
        const response = await axios.delete(`${HOLIDAY_API}/${id}`)
        const { message, holiday } = response.data
        return { success: message, holiday }
    } catch (error) {
        return { error: errResponse(error) }
    }
}

const formatHolidayData = (HolidayData) => {
    const sortedData = HolidayData.sort((a, b) => {
        return new Date(a.date) - new Date(b.date)
    });

    const idAddedData = addIdToDataGridRows(sortedData)
    return idAddedData
}

// Holidays ======================================================
const LEAVE_API = PUBLIC_SERVER_ONE + '/leaves'

const getPendngLeaveData = async () => {
    try {
        const response = await axios.get(`${LEAVE_API}/pending`)
        const leaves = response.data.leaves
        return { leaves }
    } catch (error) {
        return { error: errResponse(error) }
    }
}

const createLeaveData = async (leaveData) => {
    try {
        const response = await axios.post(LEAVE_API, leaveData)
        const { message, leave } = response.data
        return { success: message, leave }
    } catch (error) {
        return { error: errResponse(error) }
    }
}


const updatePendingLeaveData = async (id, leaveData) => {
    try {
        const response = await axios.put(`${LEAVE_API}/pending/${id}`, leaveData)
        const { message, leave } = response.data
        return { success: message, leave }
    } catch (error) {
        return { error: errResponse(error) }
    }
}

const deletePendingLeaveData = async (id) => {
    try {
        const response = await axios.delete(`${LEAVE_API}/pending/${id}`)
        const message = response.data.message
        return { success: message }
    } catch (error) {
        return { error: errResponse(error) }
    }
}

const formatPendingLeaveData = (leaveData) => {
    const sortedData = leaveData.sort((a, b) => {
        return new Date(a.from) - new Date(b.from)
    });

    const idAddedData = addIdToDataGridRows(sortedData)
    return idAddedData
}
//  ===============================
const getData = async (type, category) => {
    try {
        const response = await axios.get(`${PUBLIC_SERVER_ONE}/${type}/${category}`)
        const data = response.data
        return { data: data[type] }
    } catch (error) {
        return { error: errResponse(error) }
    }
}



export {
    errResponse, textCapitalize, addIdToDataGridRows, findNumberOfDays,
    getAllRegularEmployeesData, createRegularEmployeeData, updateRegularEmployeeData, deleteRegularEmployeeData, formatRegularEmployeeData,
    getAllSubstituteEmployeesData, createSubstituteEmployeeData, updateSubstituteEmployeeData, deleteSubstituteEmployeeData, formatSubstituteEmployeeData,
    getAllHolidayData, createHolidayData, updateHolidayData, deleteHolidayData, formatHolidayData,
    getPendngLeaveData, createLeaveData, updatePendingLeaveData, deletePendingLeaveData, formatPendingLeaveData,
    getData,
}