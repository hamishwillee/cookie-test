const logElement = document.querySelector("#log");

function log(text) {
  logElement.innerText = `${logElement.innerText}${text}\n`;
  logElement.scrollTop = logElement.scrollHeight;
}

function logCookie(name, cookie) {
  if (cookie) {
    log(`${name}:`);
    for (const [key, value] of Object.entries(cookie)) {
      log(` ${key}: ${value}`);
    }
  } else {
    log(`${name}: Cookie not found`);
  }
}

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
  const cookies = await cookieStore.getAll();
  for (const cookie of cookies) {
    logCookie(cookie.name, cookie);
  }
  const cookieNames = cookies.map((cookie) => cookie.name).join(" ");
  console.log(cookieNames);
  log(`Cookies: ${cookieNames}`);
});
