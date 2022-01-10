document.querySelector(".button-container").addEventListener("click", () => {
    let text = document.getElementById("filter-jobs").value;
    getJobs().then(job => {
        let filteredJobs = filterJobs(job, text);
        console.log(filteredJobs.length);
        showJobs(filteredJobs);
    })
});
function getJobs() {
    return fetch("../data.json").then(response => response.json()).then(data => {
        // console.log(data);
        return data
    })
}
function showJobs(jobs) {
    // console.log("The jobs in show jobs;", jobs)
    let jobsContainer = document.querySelector(".jobs-container");
    let jobsHTML = ""
    jobs.forEach(job => {
        jobsHTML += `
                <div class="job-tile">
                    <div class="top">
                        <img src="${job.logo}" alt="${job.company}'s logo" srcset="">
                        <span class="material-icons more_horiz">
                            more_horiz
                        </span>
                    </div>
                    <div class="rolename">
                        <span>${job.roleName}</span>
                    </div>
                    <div class="description">
                        <span>
                        ${job.requirements.content}
                        </span>
                    </div>
                    <div class="buttons">
                        <div class="button apply-now">
                            Aplpy Now
                        </div>
                        <div class="button">
                            Message
                        </div>

                    </div>
                 </div>
        `;
        // console.log(jobsHTML)
        jobsContainer.innerHTML = jobsHTML;
    });
    let numberOfJobs=jobs.length;
    let jobsNumberField=document.querySelector(".numberOfJobs")
    jobsNumberField.textContent=numberOfJobs;
    // console.log(jobsContainer)
}
getJobs().then(data => {
    showJobs(data);;
});
function filterJobs(jobs, searchText) {
    if (searchText) {
        let filteredJobs = jobs.filter(job => {
            if (job.roleName.toLowerCase().includes(searchText) ||
                job.type.toLowerCase().includes(searchText) ||
                job.requirements.content.toLowerCase().includes(searchText) ||
                job.company.toLowerCase().includes(searchText)) {
                return true;
            }
            else {
                return false;
            }
        })
        return filteredJobs;

    }
    else {
        return jobs;
    }

}