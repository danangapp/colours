class Functionx {
  
  // async ambilData(url) {
  //   await fetch(url, {
		// method: "GET",
		// headers: {
		// 	'Accept': 'application/json',
		// 	'Content-Type': 'application/json',
		// 	'Authorization': 'Bearer ' + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjA2MGFlYmE2NzBiOWIxZmVhNTIyZDhjNDEwNDJmNmVmMGMzM2VlZmU1NThjYmI5ZGZjMWU0MTlmZmNmZDBhZGRmOTJlZDMzZTY3NzExZWQzIn0.eyJhdWQiOiI0IiwianRpIjoiMDYwYWViYTY3MGI5YjFmZWE1MjJkOGM0MTA0MmY2ZWYwYzMzZWVmZTU1OGNiYjlkZmMxZTQxOWZmY2ZkMGFkZGY5MmVkMzNlNjc3MTFlZDMiLCJpYXQiOjE1NzA3OTI2OTMsIm5iZiI6MTU3MDc5MjY5MywiZXhwIjoxNjAyNDE1MDkzLCJzdWIiOiIyIiwic2NvcGVzIjpbXX0.eMvyV_I5I7z32WfEpyydXKiYk8fjSqNSgmXKKN8lnWxnLIfKsCyBd1paC3KjD4jxWSd_cvExFqcQDjdbqbX2seF8lLdPkpAS1wv5n3k30DH-z1MCYFJjWTmC8zMOSzQthDLYUe9TNK1PJOw9RkMMaDH0cF_MdnOxP-nJjNzVCz03byyC2K3bZmFrSv9dK84TDznaKWBZPw9tvHzk3usjWw2z9rPrZD8ILFY1TW2jBY0rEs1WlcFscI8Yf21fEZO9GOvX7lEvDLNoa7pOi8P4bCCkQL3T1jAFyvW4L4XYAYkKVhDmFuArsWW9GFPxjFM_cPkD4dH1CVMMZa257HNJdlA8Nutu5TusRPCQ1ZeH-RcJ4A4_wR_0p76Z5nFsVZ2IPxXvXeTKuO-Gm5g9a7Uj3j4azggY7q352jf67gAfnBwgLsAtoAm43DYQRUPp9uVndeYSvcnRseLW9oJ92NOCwlNinu0bwZFaLC8gP4zoqAugcXyWGTRQ9ZSmm9Cs5-xLmffa6wNGxul2DZhV-QeOwV4jcbFR76cw-I2NqjdtkL9oIHWJ9w6_dz-i1T8PZeQss95WGrqChXx79RqLQz2CHPN7d8E2HcgA5mUJac-AXLOuXCtUsoXl2vsMUNo4_CVRaBgr1htuVRrIgMdvSOpuEwLYOLRUc93vy7DbN_3QTTA',
		// }
  //   })
  //   .then((response) => response.json())
  //   .then((responseData) => {
  //   	return responseData.data;
  //   })
  //   .catch((error) =>{
		// console.error(error);
  //   });
  // }

  fetchData(method, url) {
    fetch(url, {
      method: method,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then((response) => response.json())
  }

  cab() {
    return "haloo";
  }
}

const funct = new Functionx();
export default funct;