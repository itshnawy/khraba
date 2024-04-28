document.addEventListener("DOMContentLoaded", function() {

fetch('assets/data/gov.json').then(response => {
    if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json()
}).then(data => {
    let gov = data
    let govSelect = document.getElementById("gov");
    govSelect.innerHTML = '<option value="المحافظة">المحافظة</option>'
    for (let i = 0; i < gov.length; i++) {
        govSelect.innerHTML += `<option data-govid="${gov[i].id}" value="${gov[i].gov_ar}">${gov[i].gov_ar}</option>`
    }
})


document.getElementById("gov").addEventListener("change", function() {
    let govSelect = this;
    let selectedOption = govSelect.options[govSelect.selectedIndex];
    let governorateId = selectedOption.getAttribute("data-govid");
fetch('assets/data/city.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {

    if (govSelect.selectedIndex !== -1) {
        let cities = data.filter(city => city.governorate_id === governorateId);
        let citySelect = document.getElementById("area");
        citySelect.innerHTML = '<option value="المدينة">المدينة</option>'
        cities.forEach(city => {
          citySelect.innerHTML += `<option value="${city.city_ar}">${city.city_ar}</option>`;
        });
      } else {
        console.error('No governorate selected');
      }
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });
});
});