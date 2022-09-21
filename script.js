'use strict';
const openModal = document.querySelector('.support-btn');
const modal = document.querySelector('.modal');
const closeModal = document.querySelector('.close-modal');
const overlay = document.querySelector('.overlay');
const characterContainer = document.querySelector('.chracters--list');
const statusType = document.querySelector('.status-type');
const searchBar = document.querySelector('.search');
const searchInput = document.querySelector('.search__field');
const block = document.querySelector('.block');
const searchSection = document.querySelector('.search__section');
// let green = document.querySelector('.status-type').style.backgroundColor = 'yellow';
// let red = document.querySelector('.status-type').style.backgroundColor = 'pink';
const errorHandler = document.querySelector('.error');
const showError = errorHandler.visibility = "visible";
const paginationEl = document.querySelector('.pagination');

const showModal = function() {
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
};

const removeModal = function() {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
};

openModal.addEventListener('click', showModal);

closeModal.addEventListener('click', removeModal);

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        modal.classList.add('hidden');
        overlay.classList.add('hidden');
    }
});

overlay.addEventListener('click', removeModal);

const createChracter = function(data, data2) {
    const html = `
           <div class="chracter">
                <div>
                    <img src="${data.image}" alt="">
                </div>
                <div class="chracter__info">
                    <h2>${data.name}</h2>
                    <div class="check-status">
                        <b class="status-type">${
                        data.status === 'Alive' ? 'yes' : 'no'
                       }</b>
                       <h4>${data.status} - ${data.species}</h4>
                    </div>
                    <span>Last known location:</span>
                    <p class="location"><a href="${data.location.url}">${
                    data.location.name
                    }</a></p>
                    <span>First seen in:</span>
                    <p style="margin-top:.6em;"><a href='${data.episode[0]}'>${
                    data2.name
                    }</a></p>
                </div>
            </div>
    `;
    block.insertAdjacentHTML('beforeend', html);
};
//<b class="status-type">.${data.status === "Alive" ? green : red}</b>
//<p style="margin-top:.6em;"><a href='#'>${data2.name}</a></p>
// <p style="margin-top:.6em;"><a href='#'>${data.episode[0]}</a></p>

const getChracter = async function(character, episode) {
    setTimeout(function() {
        try {
            fetch(`https://rickandmortyapi.com/api/character/${character}`)
                .then(res => {
                    return res.json();
                })
                .then(info1 => {
                    console.log(info1);
                    //createChracter(info1)
                    fetch(`https://rickandmortyapi.com/api/episode/${episode}`)
                        .then(res2 => {
                            return res2.json();
                        })
                        .then(info2 => {
                            console.log(info2);
                            createChracter(info1, info2);
                        });
                });
            //if (!res.ok) throw new Error(`${showError} (${info1.status})`)

        } catch (error) {
            showError.style.visibility = "visible";
        }
    }, 1000);
}

getChracter(30, 31);
getChracter(215, 10);
getChracter(31, 15);
getChracter(225, 19);
getChracter(256, 21);
getChracter(350, 30);
getChracter(814, 51);
getChracter(800, 47);
getChracter(230, 7);
getChracter(120, 5);

const btntoclick = function() {
        const btn1 = `
        <button data-goto="2" class="btn--inline">second</button>
`;
        paginationEl.insertAdjacentHTML('beforeend', btn1)
    }
    //<button data-goto="1" class="btn--inline">first</button>

searchBar.addEventListener('submit', function(e) {
    e.preventDefault();
    const query = searchInput.value;
    block.style.display = 'none';

    const loadSearchResults = function(query, page = 3) {
        try {
            fetch(`https://rickandmortyapi.com/api/character/?name=${query}`)
                .then(res => {
                    console.log(res);
                    return res.json();
                })
                .then(data => {
                    console.log(data);
                    const start = (page - 1) * 5;
                    const end = page * 5;
                    const search = data.results.slice(start, end);
                    console.log(search);
                    search.map(rec => {
                        const html = `
                        <div class="chracter">
                        <div>
                            <img src="https://rickandmortyapi.com/api/character/avatar/${rec.id}.jpeg" alt="">
                        </div>
        
                        <div class="chracter__info">
                            <h2 style="margin-bottom: .3em;">${rec.name}</h2>
                            <span>status:</span>
                            <div class="check-status">
                                <b class="status-type">
                                ${rec.status === 'Alive' ? 'yes' : 'no'}
                                </b>
                                <h4 style="margin-bottom: .4em;">${rec.status}</h4>
                            </div>
                            <span>Species:</span>
                            <br>
                            <p style="margin-top: .5em; margin-bottom: .5em; color:white;">${rec.species}</p>
                            <span>Type:</span>
                            <p style="margin-top:.5em; color:white;">${rec.type === '' ? 'unknown' : rec.type}</p>
                        </div>
                    </div>
                        `;
                        document.querySelector('.search__section').insertAdjacentHTML('beforeend', html);
                    });

                    btntoclick();

                    paginationEl.querySelector('button').addEventListener('click', function(e) {
                            const btn = e.target.closest('.btn--inline');
                            console.log(btn);
                            if (!btn) return;

                            const goToPage = +btn.dataset.goto;
                            console.log(goToPage);

                            const resultsPerPage = 5;
                            const numPages = Math.ceil(data.results.length / resultsPerPage);
                            console.log(numPages);

                            if (page === 1 && numPages >= 1) {
                                console.log('first nextbtn');
                                const nextbtn = function() {
                                    const bttt = `
                                    <button data-goto="${page + 1}" class="btn--inline">
                                                     <span>Page ${page + 1}</span>
                                                     <i class="fa-solid fa-arrow-right"></i>
                                                   </button>
                                `;
                                    paginationEl.insertAdjacentHTML('beforeend', bttt);
                                }
                                return nextbtn();
                            } else if (page === numPages && numPages > 1) {
                                console.log('second last page goback');
                                const nextbtn = function() {
                                    const bttt = `
                                    <button data-goto="${page - 1}" class="btn--inline">
                                              <i class="fa-solid fa-arrow-left-long"></i>
                                                       <span>Page ${page - 1}</span>
                                                   </button>
                                `;
                                    paginationEl.insertAdjacentHTML('beforeend', bttt);
                                }
                                return nextbtn();

                            } else if (page < numPages) {
                                console.log('third continue');
                                const nextbtn = function() {
                                    const bttt = `
                                    <button data-goto="${page - 1}" class="btn--inline">
                                                 <i class="fa-solid fa-arrow-left-long"></i>
                                                 <span>Page ${page - 1}</span>
                                             </button>
                                             <button data-goto="${page + 1}" class="btn--inline">
                                                       <span>Page ${page + 1}</span>
                                                      <i class="fa-solid fa-arrow-right"></i>
                                                 </button>
                                `;
                                    paginationEl.insertAdjacentHTML('beforeend', bttt);
                                }
                                return nextbtn();
                            } else {
                                console.log('undefine');
                            }
                        })
                        // if (page === 1 && numPages > 1) {
                        //     console.log('first');
                        // }

                    // if (page === numPages && numPages > 1) {
                    //     console.log('second');
                    // }
                    // if (page < numPages) {
                    //     console.log('third');
                    // }
                    // return ``;
                    // paginationEl.addEventListener('click', function(e) {
                    //     const btn = e.target.closest('.btn--inline');
                    //     console.log(btn);

                    //     if (!btn) return;

                    //     const goToPage = +btn.dataset.goto;
                    //     console.log(goToPage);
                    //     const resultsPerPage = 5;
                    //     const numPages = Math.ceil(data.results.length / resultsPerPage);
                    //     console.log(numPages);

                    //     if (page === 1 && numPages > 1) {
                    //         //console.log(`page 1`);
                    //         return `
                    //         <button data-goto="${page + 1
                    //             }" class="btn--inline">
                    //             <span>Page ${page + 1}</span>
                    //             <i class="fa-solid fa-arrow-right"></i>
                    //           </button>
                    //         `;
                    //     }

                    //     if (page === numPages && numPages > 1) {
                    //         //console.log(`last page`);
                    //         return `
                    //         <button data-goto="${page - 1
                    //             }" class="btn--inline">
                    //           <i class="fa-solid fa-arrow-left-long"></i>
                    //               <span>Page ${page - 1}</span>
                    //           </button>
                    //         `;
                    //     }

                    //     if (page < numPages) {
                    //         //console.log(`other page`);
                    //         return `
                    //         <button data-goto="${page - 1
                    //             }" class="btn--inline">
                    //             <i class="fa-solid fa-arrow-left-long"></i>
                    //             <span>Page ${page - 1}</span>
                    //         </button>
                    //         <button data-goto="${page + 1
                    //             }" class="btn--inline">
                    //               <span>Page ${page + 1}</span>
                    //               <i class="fa-solid fa-arrow-right"></i>
                    //         </button>
                    //         `;
                    //     }
                    //     return ``;
                    // })
                })
                // if (!ok) return;
        } catch (error) {
            console.log(`${error}`);
        }
    }
    loadSearchResults(query);
});
