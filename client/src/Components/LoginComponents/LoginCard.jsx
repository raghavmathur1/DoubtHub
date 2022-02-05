import React, { useEffect, useState } from "react";
import Input from "../DashboardComponents/Input";
import LoginButtons from "./LoginButtons";
import "../../Styles/page-styles/login.css";
import mailIcon from "../../Assets/Icons/mail.svg";
import eye from "../../Assets/Icons/eye.svg";
import axios from "axios";
import validator from "validator";

const api_endpoint = process.env.REACT_APP_API_ENDPOINT;

const LoginCard = (props) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [rePassword, setRePassword] = useState("");
	const [localAuth, setLocalAuth] = useState(null);
	const [localSignUp, setLocalSignUp] = useState("");
	const [errorMessage, setErrorMessage] = useState("");

	const submitLogin = () => {
		var validateEmail = email;
		if (validator.isEmail(validateEmail)) {
			axios({
				method: "POST",
				data: {
					username: email,
					password: password,
				},
				withCredentials: true,
				url: api_endpoint + "/user/auth/local",
			}).then((response) => setLocalAuth(response.data));
		} else {
			setErrorMessage("Enter valid Email!");
		}
	};

	const submitSignUp = () => {
		var validateEmail = email;
		if (validator.isEmail(validateEmail)) {
			if (password === rePassword && password !== "") {
				axios
					.post(api_endpoint + "/user/signup", {
						username: email,
						password: password,
					})
					.then((response) => setLocalSignUp(response.data));
				console.log("axios");
			} else {
				setErrorMessage("Password Mismatch!");
			}
		} else {
			setErrorMessage("Enter valid Email!");
		}
	};

	useEffect(() => {
		console.log(localSignUp);
		if (localSignUp === "New User Created") {
			window.open("/login", "_self");
		} else if (localSignUp === "User Already Exists") {
			alert("User Already Exists");
		} else {
		}
	}, [localSignUp]);

	useEffect(() => {
		if (localAuth === true) {
			window.open("/dashboard", "_self");
		} else if (localAuth === false) {
			alert("Incorrect Pass");
			setPassword("");
		} else {
		}
	}, [localAuth]);

	return (
		<div className="cardComponent loginComponent">
			<form className="form" action="">
				<div className="heading">
					{props.heading}
					<span
						style={{
							fontSize: "15px",
							color: "red",
							padding: "15px",
						}}
					>
						{errorMessage}
					</span>
				</div>
				<Input
					icon={mailIcon}
					heading="Email"
					type="email"
					placeholder="Enter Email"
					update={setEmail}
				/>
				<Input
					icon={eye}
					heading="Password"
					type="password"
					placeholder="Enter Password"
					update={setPassword}
				/>

				{props.page === "login" ? (
					<LoginButtons submit={submitLogin} />
				) : (
					<div className="centerSignUp">
						<Input
							icon={eye}
							heading="Re-enter Password"
							type="password"
							placeholder="Re-enter Password"
							update={setRePassword}
						/>

						<button
							type="button"
							className="button"
							onClick={submitSignUp}
						>
							Sign Up
						</button>
					</div>
				)}
			</form>
		</div>
	);
};

export default LoginCard;
