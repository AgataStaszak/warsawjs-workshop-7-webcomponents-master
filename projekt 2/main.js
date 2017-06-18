const LIMIT_OF_REPOSITORY_LIST = 9;

class GitHubProfileCardElement extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
    }

     connectedCallback() {
        let $template =  document.currentScript.ownerDocument.querySelector('#github-profile-card-template').content.cloneNode(true);
        this.shadow.appendChild($template);

        let login = this.attributes.login.value;

        Promise.resolve(login)
            .then(this._fetchProfileDetails.bind(this));


    }
    _fetchProfileDetails (login){
        console.log(login);
        //let url = "https://api.github.com/users/" + login;
        let url = "mocks/github-piecioshka-profile.json";
        fetch(url)
            .then((response)=> {
                //console.log(response);
                return(response.json());
            })
            .then((res) => {
                this.displayProfile(res);
            })
    }

    displayProfile (profile){
        console.log(profile);
        this.shadow.querySelector(".profile-avatar").setAttribute('src', profile.avatar_url);
        this.shadow.querySelector(".profile-name").innerText =  profile.name;
        this.shadow.querySelector(".profile-bio").innerText =  profile.bio;
        this.shadow.querySelector(".profile-location").innerText =  profile.location;
    }
}

    window.customElements.define('github-profile-card-element', GitHubProfileCardElement)