import firebase from '../firebase'

export default class HabitController {
	static getMonthHabits(month){

	}

	static setDayHabitOccurence(day, habitId){
		return new Promise((resolve, reject) => {
			// wyslij zaputanie do fb
			// jeżeli ok to resolve(wynik)
			// jeżelinie to reject(błąd)
		})
	}
}