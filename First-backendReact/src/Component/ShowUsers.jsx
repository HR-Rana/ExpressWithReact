import React, { useState } from "react";
import { useEffect } from "react";

export default function ShowUsers() {
	const [User, setUser] = useState([]);
	const [update, setUpdate] = useState(false);

	const [UpdateData, setUpdateData] = useState({
		name: "",
		email: "",
		address: "",
		age: "",
		hobby: "",
	});

	const HandleChangeForm = (e) => {
		setUpdateData({ ...UpdateData, [e.target.name]: e.target.value });
	};

	useEffect(() => {
		fetch("http://localhost:5000/find-users")
			.then((res) => res.json())
			.then((data) => setUser(data));
	}, []);

	const deleteData = (email) => {
		fetch(`http://localhost:5000/deleteUser/${email}`, {
			method: "DELETE",
		}).then((res) => {
			console.log(res);
			if (!res.ok) {
				alert("something went wrong..!");
			} else {
				alert(`do you want to delete ${email} ?`);
				location.reload();
			}
		});
	};

	const updateData = (email) => {
		sessionStorage.setItem("email", JSON.stringify(email));
		// alert("do you want to update data?");
		setUpdate(!update);
	};
	const HandleUpdateData = () => {
		const GetEmail = sessionStorage.getItem("email");
		const Email = JSON.parse(GetEmail);
		console.log(Email);

		fetch(`http://localhost:5000/user-update/${Email}`, {
			method: "PUT",
			headers: { "content-type": "application/json" },
			body: JSON.stringify(UpdateData),
		})
			.then(() => {
				console.log("data Updated");
			})
			.catch((err) => {
				alert(err.message);
			});

		setUpdate(!update);
	};

	return (
		<div className="user-page">
			<h2>
				hello there is <span style={{ color: "red" }}>{User.length}</span>{" "}
				users.
			</h2>
			<br />
			<div className="user-list">
				{User.map((items, index) => {
					return (
						<div className="user-data" key={index}>
							<h3>
								User name Is: <span style={{ color: "red" }}>{items.name}</span>
							</h3>
							<p>User Email: {items.email}</p>
							<p>Age: {items.age}</p>
							<p>Address: {items.address}</p>

							<div className="buttons">
								<button
									style={{ backgroundColor: "red" }}
									onClick={() => deleteData(items.email)}
								>
									Delete
								</button>
								<button
									style={{ backgroundColor: "royalblue" }}
									onClick={(e) => updateData(items.email)}
								>
									Update
								</button>
							</div>
						</div>
					);
				})}
			</div>
			{update ? (
				<div className="update-user">
					<div className="update-box">
						<form action="">
							<input
								type="text"
								name="name"
								placeholder="name"
								onChange={HandleChangeForm}
							/>
							<input
								type="email"
								name="email"
								placeholder="email"
								required
								onChange={HandleChangeForm}
							/>
							<input
								type="text"
								name="address"
								placeholder="address"
								onChange={HandleChangeForm}
							/>
							<input
								type="text"
								name="age"
								placeholder="age"
								onChange={HandleChangeForm}
							/>
							<input
								type="text"
								name="hobby"
								placeholder="hobby"
								onChange={HandleChangeForm}
							/>
						</form>
						<div className="button">
							<button
								onClick={(e) => {
									setUpdate(!update);
								}}
							>
								cencle
							</button>
							<button onClick={HandleUpdateData}>Update</button>
						</div>
					</div>
				</div>
			) : (
				" "
			)}
		</div>
	);
}
