pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                script {
                    // Build the Docker images
                    sh 'docker-compose build'
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    // Deploy the Docker containers
                    sh 'docker-compose up -d'
                }
            }
        }
    }
}