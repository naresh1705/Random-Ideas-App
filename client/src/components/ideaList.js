import IdeasApi from "../services/IdeasApi";

class ideaList {
  constructor() {
    this._idealistEl = document.querySelector("#idea-list");
    this._ideas = [];
    this.getIdeas();
    this._validTags = new Set();
    this._validTags.add("technology");
    this._validTags.add("software");
    this._validTags.add("buisness");
    this._validTags.add("education");
    this._validTags.add("health");
    this._validTags.add("inventions");
  }

  addEventListners() {
    this._idealistEl.addEventListener("click", (e) => {
      if (e.target.classList.contains("fa-times")) {
        e.stopImmediatePropagation();
        const ideaId = e.target.parentElement.parentElement.dataset.id;
        this.deleteIdea(ideaId);
      }
    });
  }

  async getIdeas() {
    try {
      const res = await IdeasApi.GetIdeas();
      this._ideas = res.data.data;
      this.render();
    } catch (error) {
      console.log(error);
    }
  }

  async deleteIdea(ideaId) {
    try {
      const res = await IdeasApi.deleteIdea(ideaId);
      this._ideas.filter((idea) => idea.id !== ideaId);
      this.getIdeas();
    } catch (error) {
      alert("You cannot delete this resource");
    }
  }

  addIdeatoList(idea) {
    this._ideas.push(idea);
    this.render();
  }

  getTagClass(tag) {
    if (!tag) {
      return "";
    }

    tag = tag.toLowerCase();
    let tagClass = "";

    if (this._validTags.has(tag)) {
      return (tagClass = `tag-${tag}`);
    }
    return "";
  }

  render() {
    this._idealistEl.innerHTML = this._ideas
      .map((idea) => {
        const tagClass = this.getTagClass(idea.tag);
        const deleteBtn =
          idea.username === localStorage.getItem("username")
            ? `<button class="delete"><i class="fas fa-times"></i></button>`
            : "";
        return `
        <div class="card" data-id="${idea._id}">
          ${deleteBtn}
          <h3>
          ${idea.text}
          </h3>
          <p class="tag ${tagClass}">${idea.tag ? idea.tag.toUpperCase() : ""}</p>
          <p>
            Posted on <span class="date">${idea.Date}</span> by
            <span class="author">${idea.username}</span>
          </p>
        </div>`;
      })
      .join("");
    this.addEventListners();
  }
}

export default ideaList;
