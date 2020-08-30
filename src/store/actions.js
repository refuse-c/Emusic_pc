/*
 * @Author: REFUSE_C
 * @Date: 2020-08-18 19:45:41
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-08-30 09:22:30
 * @Description: 
 */
export const QUERY_USER_INFO = 'QUERY_USER_INFO';


export function query(data) {
  return { type: SET_PAGE_TITLE, data: data }
}