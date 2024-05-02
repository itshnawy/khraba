let scriptUrl = 'https://script.google.com/macros/s/AKfycbz7me6TKenjsmj33tNy3Mlc3GWY5XH-973eYAarlxcMMBetoDS923Lcbn1MzBGQBpvZdA/exec';
let date = new Date();
document.getElementById("Submittedat").value = date;
const form = document.forms['add'];

form.addEventListener("submit", e => {
  e.preventDefault();
  const area = document.getElementById('area').value;
  const gov = document.getElementById('gov').value;
  if (area != 'المدينة' && gov != 'المحافظة') {
    fetch(scriptUrl, { method: 'POST', body: new FormData(form) })
      .then(response => alert("المعاد اتضاف بنجاح"))
      .then(() => { window.location.reload() })
      .catch(error => console.log("فيه ايرور يسطا"))
  } else {
    alert("فيه مشكله شكلك مخترتش المدينة او المحافظة")
  }
})
