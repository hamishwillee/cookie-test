const add = document.querySelector("#add");
add.addEventListener("click", async () => {
	const newNameInput = document.querySelector("#newName");
	const newValueInput = document.querySelector("#newValue");

	if (document.querySelector("#useDocumentCookie").checked) {
		console.log("Using document.cookie");
		document.cookie = `${newNameInput.value}=${newValueInput.value}`;
	} else {
		await cookieStore.set({
			name: newNameInput.value,
			value: newValueInput.value,
		});
	}
});

const deleteCookie = document.querySelector("#delete");
deleteCookie.addEventListener("click", async () => {
	const cookieToDelete = document.querySelector("#cookieToDelete").value;
	console.log(`Deleting: ${cookieToDelete}`);
	await cookieStore.delete(cookieToDelete);
});

const deleteAllCookies = document.querySelector("#deleteAll");
deleteAllCookies.addEventListener("click", async () => {
	const allCookies = await cookieStore.getAll();
	for (const cookie of allCookies) {
		const cookieToDelete = cookie.name;
		console.log(`Deleting: ${cookieToDelete}`);
		await cookieStore.delete(cookieToDelete);
	}
});

const list = document.querySelector("#list");
list.addEventListener("click", async () => {
	const cookieNames = (await cookieStore.getAll())
		.map((cookie) => cookie.name)
		.join(" ");
	console.log(cookieNames);
});
