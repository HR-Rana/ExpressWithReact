import React, { useState } from "react";
import { useEffect } from "react";

export default function ShowUsers() {
	const [User, setUser] = useState([]);

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
		alert("do you want to update data?");
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
		</div>
	);
}
