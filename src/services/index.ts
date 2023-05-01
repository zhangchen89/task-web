import request from './request';


export async function createTask (query:any){
    return request.post(`/zeebe/api/simple-task`, {
        // return request.post(`/coco-service/crdc-doc/auth/wechat/getJsApiConfig/`, {
        data: query
    })
}

export async function queryTask (query:any){
    return request.post(`/zeebe/api/task-list-executor?executor=${query.executor}`, {
        data: query
    })
}

export async function completeTask (query:any){
    return request.post(`/zeebe/api/complete`, {
        data: query
    })
}


export async function taskAssign (query:any){
    return request.post(`/zeebe/api/task-assign`, {
        data: query
    })
}

export async function suspendTask (query:any){
    return request.post(`/zeebe/api/suspend`, {
        data: query
    })
}

export async function unsuspendTask (query:any){
    return request.post(`/zeebe/api/unsuspend`, {
        data: query
    })
}

export async function forwardTask (query:any){
    return request.post(`/zeebe/api/forward`, {
        data: query
    })
}