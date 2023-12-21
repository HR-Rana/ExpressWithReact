import React, { useState } from "react";
import ShowUsers from "./ShowUsers";

export default function Home() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [address, setAddress] = useState("");
	const [age, setAge] = useState("");

	const HandleSubmit = (e) => {
		e.preventDefault();

		const FormData = {
			name: name,
			email: email,
			age: age,
			address: address,
		};


		if (name == "" || email == "" || age == " " || address == "") {
			alert("please fillup the form");
		} else {
			fetch("http://localhost:5000/user", {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify(FormData),
			});
      console.log(FormData)
		}
	};

	return (
		<div>
			<form onSubmit={HandleSubmit}>
				<input
					type="text"
					placeholder="Name"
					onChange={(e) => setName(e.target.value)}
				/>
				<br />
				<input
					type="email"
					placeholder="email"
					onChange={(e) => setEmail(e.target.value)}
				/>
				<br />
				<input
					type="text"
					placeholder="Address"
					onChange={(e) => setAddress(e.target.value)}
				/>
				<br />
				<input
					type="text"
					placeholder="age"
					onChange={(e) => setAge(e.target.value)}
				/>
				<br />
				<input type="submit" value={"Submit Form"} />
			</form>

      <div className="show-users">
        <ShowUsers></ShowUsers>
      </div>


		</div>
	);
}
