import React from 'react'
import "@/app/css/login.css"
import Link from 'next/link'

export default function Login() {
    return (
        <div className="container">
            <div className="login-content">
                <div className="login">
                    <h2>Login To Your Account</h2>
                    <form action="" id="form">
                        <div className="inputs">
                            <label htmlFor="username"><i className="bx bxs-user"></i>Username</label>
                            <input type="text" id="username" placeholder="Enter your username" name="username" required />
                        </div>
                        <div className="inputs">
                            <label htmlFor="password"><i className="bx bxs-lock-alt"></i>Password</label>
                            <input type="password" id="password" placeholder="Enter your password" name="password" required />
                        </div>
                        <div className="inputs">
                          <Link href={'/'}> <input type="submit" value="Login" id="login" /></Link>  
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
