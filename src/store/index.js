const KEY = 'hm-toutiao-77-user'

export default {
  setUser (user) {
    const localUser = this.getUser()
    // 如果是登录时候使用  {} 空对象  {id,name,photo,token,refresh_token} 完整信息
    // 把你想存入的信息 合并覆盖到  当前user对象即可
    const nowUser = { ...localUser, ...user }
    window.sessionStorage.setItem(KEY, JSON.stringify(nowUser))
  },
  getUser () {
    return JSON.parse(window.sessionStorage.getItem(KEY) || '{}')
  },
  clearUser () {
    window.sessionStorage.removeItem(KEY)
  }
}
