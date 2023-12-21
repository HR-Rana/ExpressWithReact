import React, { useState } from "react";
import { useEffect } from "react";

export default function ShowUsers() {
	const [User, setUser] = useState([]);

	useEffect(() => {
		fetch("http://localhost:5000/find-users")
			.then((res) => res.json())
			.then((data) => setUser(data));
	}, []);

console.log(User)

	return (
		<div>
			<h2>hello there is all of user</h2>
			<br />

			<div className="user-list">
            {
               <h1></h1>
            }
				{User.map((items, index) => {
					const {} = items;
					return (
						<div className="user-data" key={index}>
							zoom  er msg dekhen
						</div>
					)
				})}
			</div>
		</div>
	);
}
