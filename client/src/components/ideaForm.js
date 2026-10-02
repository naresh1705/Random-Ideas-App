import IdeasApi from "../services/IdeasApi";
import ideaList from "./ideaList";

class IdeaForm {
  constructor() {
    this._formModal = document.querySelector("#modal");
    this._ideaList = new ideaList();
  }

  addEventlisteners() {
    this._form.addEventListener("submit", this.handleSubmit.bind(this));
  }

  async handleSubmit(e) {
    e.preventDefault();

    if (
      !this._form.elements.text.value ||
      !this._form.elements.tag.value ||
      !this._form.elements.username.value
    ) {
      alert("Please enter all the fields");
    }

    localStorage.setItem("username", this._form.elements.username.value);

    const idea = {
      text: this._form.elements.text.value,
      tag: this._form.elements.tag.value,
      username: this._form.elements.username.value,
    };

    const newIdea = await IdeasApi.createIdeas(idea);

    this._ideaList.addIdeatoList(newIdea.data.data);

    // Clear the value

    this._form.elements.text.value = "";
    this._form.elements.tag.value = "";
    this._form.elements.username.value = "";

    this.render();

    document.dispatchEvent(new Event("closemodal"));
  }
  render() {
    this._formModal.innerHTML = `
        <div class ="modal-box">
        <form id="idea-form">
          <div class="form-control">
            <label for="idea-text">Enter a Username</label>
            <input type="text" name="username" id="username" value ="${localStorage.getItem("username") ? localStorage.getItem("username") : ""}"
          </div>
          <div class="form-control">
            <label for="idea-text">What's Your Idea?</label>
            <textarea name="text" id="idea-text"></textarea>
          </div>
          <div class="form-control">
            <label for="tag">Tag</label>
            <input type="text" name="tag" id="tag" />
          </div>
          <button class="btn" type="submit" id="submit">Submit</button>
        </form>
        </div>
      `;
    this._form = document.querySelector("#idea-form");
    this.addEventlisteners();
  }
}

export default IdeaForm;
