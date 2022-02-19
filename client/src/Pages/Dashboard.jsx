import React, { useEffect, useState, useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Profile from "../Components/DashboardComponents/Profile";
import AllQuestions from "../Components/DashboardComponents/AllQuestions";
import MyQuestions from "../Components/DashboardComponents/MyQuestions";
import Saved from "../Components/DashboardComponents/Saved";
import Sidebar from "../Components/DashboardComponents/Sidebar";
import Searchbar from "../Components/DashboardComponents/Searchbar";
import Settings from "../Components/DashboardComponents/Settings";
import QuestionPage from "../Components/QuestionPageComponents/QuestionPage";
import "../Styles/page-styles/dashboard.css";
import Menu from "../Components/DashboardComponents/Menu";
import { userObjectContext } from "../Context";
import axios from "axios";
const api_endpoint = process.env.REACT_APP_API_ENDPOINT;
const Dashboard = () => {
	// const createQuestion = () => {};
	const [user, isAuthenticated] = useContext(userObjectContext);
	const [questionData, setQuestionData] = useState([]);
	const [myData, setMyData] = useState([]);
	const [savedData, setSavedData] = useState([]);
	const [menu, setMenu] = useState(false);
	const getData = () => {
		axios
			.get(api_endpoint + "/question/getQuestions", {
				withCredentials: true,
			})
			.then((response) => {
				// console.log(response);
				setQuestionData(response.data);
			});
	};
	const myDataFunc = () => {
		axios({
			method: "POST",
			data: {
				emailID: user.emailID,
			},
			withCredentials: true,
			url: api_endpoint + "/question/myQuestions",
		}).then((response) => {
			setMyData(response.data);
			getData();
		});
	};
	useEffect(() => {
		getData();
	}, []);

	let convertDate = (createdAt) => {
		let result = createdAt.substring(0, 10);
		let day = result.substring(8, 10);
		let month = result.substring(5, 7);
		let year = result.substring(0, 4);
		if (month === "01") month = "Jan";
		else if (month === "02") month = "Feb";
		else if (month === "03") month = "Mar";
		else if (month === "04") month = "Apr";
		else if (month === "05") month = "May";
		else if (month === "06") month = "Jun";
		else if (month === "07") month = "Jul";
		else if (month === "08") month = "Aug";
		else if (month === "09") month = "Sep";
		else if (month === "10") month = "Oct";
		else if (month === "11") month = "Nov";
		else if (month === "12") month = "Dec";
		result = day + " " + month + " " + year;
		return result;
	};
	if (isAuthenticated === true) {
		return (
			<div className="container">
				<Sidebar setMenu={setMenu} menu={menu} />
				<Searchbar />
				<Menu menu={menu} setMenu={setMenu} />
				<div className="centerContent">
					<Routes>
						<Route
							exact
							path="/"
							element={
								<AllQuestions
									data={questionData}
									getData={getData}
								/>
							}
						></Route>
						<Route
							exact
							path="/myQuestions"
							element={
								<MyQuestions
									data={myData}
									getData={myDataFunc}
									convertDate={convertDate}
								/>
							}
						></Route>
						<Route
							exact
							path="/saved"
							element={
								<Saved
									data={savedData}
									getData={getData}
									convertDate={convertDate}
									setData={setSavedData}
								/>
							}
						></Route>

						<Route
							exact
							path="/profile"
							element={<Profile />}
						></Route>
						<Route
							exact
							path="/settings"
							element={<Settings />}
						></Route>
						<Route
							exact
							path="/:id"
							element={<QuestionPage convertDate={convertDate} />}
						></Route>
					</Routes>
				</div>
			</div>
		);
	} else if (isAuthenticated === false) {
		return <Navigate to="/login" />;
	} else {
		return null;
	}
};

export default React.memo(Dashboard);
