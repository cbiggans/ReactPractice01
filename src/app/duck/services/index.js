import firebase from 'firebase/app'
import 'firebase/firestore'
import MarkSessionService from './markSessions'
import MarkWidgetService from './markWidgets'
import MarkService from './marks'
import NoteService from './notes'

// import { addDomainField } from '../../../scripts/update_mark_fields'


const firebaseConfig = {
	apiKey: "AIzaSyBQbPqLqlmMEmI6vPQvIbCO44d_OES8YhI",
	authDomain: "test-project-02-cd5ac.firebaseapp.com",
	databaseURL: "https://test-project-02-cd5ac.firebaseio.com",
	projectId: "test-project-02-cd5ac",
	storageBucket: "test-project-02-cd5ac.appspot.com",
	messagingSenderId: "621754166314",
	appId: "1:621754166314:web:2b20b2a0231b243a"
};

firebase.initializeApp(firebaseConfig)

export const db = firebase.firestore()

const services = {
	markSessions: new MarkSessionService(),
  markWidgets: new MarkWidgetService(),
	marks: new MarkService(),
  notes: new NoteService(),
}

// addDomainField(services)

export default services
