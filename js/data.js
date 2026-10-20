(() => {
  "use strict";
  // Fictional sample records with Egyptian names and cities.
  const people = [
    { name: "Ahmed Hassan", age: 24, city: "Cairo" },
    { name: "Mariam Mohamed", age: 21, city: "Alexandria" },
    { name: "Omar Ibrahim", age: 29, city: "Giza" },
    { name: "Nour Ali", age: 19, city: "Mansoura" },
    { name: "Youssef Mahmoud", age: 32, city: "Luxor" },
    { name: "Salma Mostafa", age: 27, city: "Aswan" },
    { name: "Karim Adel", age: 23, city: "Tanta" },
    { name: "Fatma Samir", age: 35, city: "Port Said" },
    { name: "Mahmoud Fathy", age: 28, city: "Suez" },
    { name: "Hana Khaled", age: 22, city: "Ismailia" },
    { name: "Amr Nabil", age: 41, city: "Faiyum" },
    { name: "Aya Sherif", age: 26, city: "Zagazig" },
    { name: "Mostafa Reda", age: 30, city: "Minya" },
    { name: "Dina Tarek", age: 20, city: "Damietta" },
    { name: "Hassan Abdelrahman", age: 38, city: "Beni Suef" }
  ];
  const search = document.querySelector("#search"), tbody = document.querySelector("#people-table-body"), count = document.querySelector("#result-count");
  let sortKey = "name", direction = 1;
  function render() {
    const q = search.value.trim().toLocaleLowerCase();
    const rows = people.filter(p => p.name.toLocaleLowerCase().includes(q) || p.city.toLocaleLowerCase().includes(q) || String(p.age).includes(q));
    rows.sort((a,b) => (typeof a[sortKey] === "number" ? a[sortKey] - b[sortKey] : String(a[sortKey]).localeCompare(String(b[sortKey]), "en")) * direction);
    tbody.replaceChildren();
    rows.forEach(p => {
      const tr = document.createElement("tr");
      [p.name, String(p.age), p.city].forEach(value => { const td = document.createElement("td"); td.textContent = value; tr.appendChild(td); });
      tbody.appendChild(tr);
    });
    count.textContent = `${rows.length} ${rows.length === 1 ? "record" : "records"} found`;
  }
  function sortBy(key) { direction = sortKey === key ? direction * -1 : 1; sortKey = key; render(); }
  search.addEventListener("input", render);
  document.querySelector("#sort-name").addEventListener("click", () => sortBy("name"));
  document.querySelector("#sort-age").addEventListener("click", () => sortBy("age"));
  document.querySelector("#sort-city").addEventListener("click", () => sortBy("city"));
  render();
})();
