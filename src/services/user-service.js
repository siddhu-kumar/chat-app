import { myAxios, privateAxios } from './helper'

export const loginUser = (loginUser) => {
    
    console.log('login user',loginUser)
    return myAxios.post('/user/login', loginUser)
    .then((res) => {
    return  res.data
    })
}

export const emailValidate = (data) => {
    return myAxios.post("/user/validate_email",data).then(res=>res.data);
}

export const getAllUser = () => {
    return privateAxios.post('/user/all_user')
    .then(res => res.data)
}

export const receivedRequest = () => {
    return privateAxios.get('/user/received_request')
    .then(res => res.data)
}

export const deletePendingRequest = (data) => {
    console.log(data)
    return privateAxios.delete('/user/delete_request',data).then(res=>res.data)
}

export const pendingRequest = () => {
    return privateAxios.get('/user/pending_request')
    .then(res => res.data)
}

export const createRequest = (friend) => {
    console.log(friend)
    return privateAxios.post('/user/create_request',friend)
    .then(res => res.data)
}

export const acceptRequest = (friend) => {
    console.log()
    return privateAxios.post('/user/accept_request',friend)
    .then(res => res.data)
}

export const userProfile = (userData) => {
    return privateAxios.post(`/user/${userData}`)
    .then(res=> res.data)
}

export const editProfile = (userData) => {
    return privateAxios.patch('/user/update',userData)
}

export const    createUser = (userData) => {
    return myAxios.post('/user/register',userData).then(res=>res.data)
}