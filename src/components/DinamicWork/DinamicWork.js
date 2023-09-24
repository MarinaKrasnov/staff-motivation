import React, { useState, useEffect } from 'react';
import styles from './DinamicWork.module.scss';

function DinamicWork() {
	const [myAchievements, setMyAchievements] = useState(0);
	const [departmentAchievements, setDepartmentAchievements] = useState(0);
	const [organizationAchievements, setOrganizationAchievements] = useState(0);

	const calculatePercentage = (value) => Math.round((value / 100) * 100);

	const calculateProgressBarColor = (percentage) => {
		if (percentage >= 100) {
			return styles.completed;
		}
		if (percentage > 0) {
			return styles.inProgress;
		}
		return styles.notStarted;
	};

	useEffect(() => {
		const fetchDataFromServer = async () => {
			try {
				// Заглушка для fetch-запроса
				const dummyData = {
					myAchievements: 50,
					departmentAchievements: 75,
					organizationAchievements: 90,
				};

				setMyAchievements(dummyData.myAchievements);
				setDepartmentAchievements(dummyData.departmentAchievements);
				setOrganizationAchievements(dummyData.organizationAchievements);
			} catch (error) {
				console.error('Error:', error);
			}
		};

		fetchDataFromServer();
	}, []);

	return (
		<section className={styles.main}>
			<div className={styles.dinamicWork}>
				<h1 className={styles.toptext}>Динамика работы</h1>
				<div className={styles.field}>
					<div className={styles.fieldInfo}>
						<h3 className={styles.texth3}>Мои достижения</h3>
						<span className={styles.progressPercentage}>
							{calculatePercentage(myAchievements)}%
						</span>
					</div>
					<div
						className={`${styles.progressBar} ${calculateProgressBarColor(
							myAchievements
						)}`}
					>
						<div className={styles.progressFill} />
					</div>
				</div>
				<div className={styles.field}>
					<div className={styles.fieldInfo}>
						<h3 className={styles.texth3}>Достижения отдела</h3>
						<span className={styles.progressPercentage}>
							{calculatePercentage(departmentAchievements)}%
						</span>
					</div>
					<div
						className={`${styles.progressBar} ${calculateProgressBarColor(
							departmentAchievements
						)}`}
					>
						<div className={styles.progressFill} />
					</div>
				</div>
				<div className={styles.field}>
					<div className={styles.fieldInfo}>
						<h3 className={styles.texth3}>Достижения организации</h3>
						<span className={styles.progressPercentage}>
							{calculatePercentage(organizationAchievements)}%
						</span>
					</div>
					<div
						className={`${styles.progressBar} ${calculateProgressBarColor(
							organizationAchievements
						)}`}
					>
						<div className={styles.progressFill} />
					</div>
					<p className={styles.text}>
						% от плана организации на отчетный период
					</p>
				</div>
			</div>
		</section>
	);
}

export default DinamicWork;
