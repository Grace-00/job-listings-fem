const getListings = async () => {
  try {
    const response = await fetch('./data.json');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    //console.log(data)
    return data;
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
  }
}

getListings().then(listings => {
  //console.log('Fetched listings:', listings);
  const container = document.querySelector('.job-listing-card-container');
  if (!container) {
    console.error('No container found for job listings');
    return;
  }

  listings.forEach(listing => {
      const card = document.createElement('div');
      card.classList.add('job-listing-card');

      const companyLogo = document.createElement('img');
      companyLogo.src = listing.logo;
      companyLogo.alt = `${listing.company} logo`;
      
      const jobTitle = document.createElement('h2');
      jobTitle.textContent = listing.position;
      
      const companyName = document.createElement('p');
      companyName.textContent = listing.company;
      
      const jobLocation = document.createElement('p');
      jobLocation.textContent = listing.location;
      
      
      card.append(companyLogo, jobTitle, companyName, jobLocation);

      container.appendChild(card);
      
    });
});