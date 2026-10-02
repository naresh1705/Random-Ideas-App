import "./css/style.css";
import Modal from "./components/modal";
import IdeaForm from "./components/ideaForm";
import "@fortawesome/fontawesome-free/css/all.css";
import ideaList from "./components/ideaList";

const modal = new Modal();
const ideaForm = new IdeaForm();
ideaForm.render();
const idealist = new ideaList();
