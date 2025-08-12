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

      const { cardDescription, jobTitle, companyName, jobLocation, companyLogo } = getJobListing(listing, card);

      const cardtagListContainer = getJobTagList(listing);

      cardDescription.appendChild(companyName);
      cardDescription.appendChild(jobTitle);
      cardDescription.appendChild(jobLocation);

      card.appendChild(companyLogo);
      card.appendChild(cardDescription);
      card.appendChild(cardtagListContainer);

      container.appendChild(card);
    });
});

const getJobListing = (listing, card) => {
    const companyLogo = document.createElement('img');
    companyLogo.src = listing.logo;
    companyLogo.alt = `${listing.company} logo`;

    const cardDescription = document.createElement('div');
    card.classList.add('job-listing-card-description');
    const companyName = document.createElement('p');
    companyName.classList.add('job-listing-card-company-name');
    companyName.textContent = listing.company;

    const jobTitle = document.createElement('h2');
    jobTitle.textContent = listing.position;

    const jobLocation = document.createElement('p');
    jobLocation.textContent = listing.location;
    return { cardDescription, jobTitle, companyName, jobLocation, companyLogo };
}

const getJobTagList = (listing) => {
    const cardtagListContainer = document.createElement('div');
    cardtagListContainer.classList.add('job-listing-card-tag-list-container');
    const tags = [listing.role, listing.level, ...(listing.languages || []), ...(listing.tools || [])];
    const tagList = document.createElement('ul');
    tags.forEach(tag => {
        const li = document.createElement('li');
        li.textContent = tag;
        tagList.appendChild(li);
    });

    cardtagListContainer.appendChild(tagList);
    return cardtagListContainer;
}
