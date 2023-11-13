function Logout() {
    localStorage.removeItem('token');
    window.location.href = '/';
}

export default Logout;