pipeline {

    agent any

    environment {
        DOCKER_REGISTRY_CREDENTIALS = credentials('your-docker-registry-credentials-id')
        PORTAINER_API_URL = 'http://46.250.229.65:9000/'
        PORTAINER_API_USERNAME = 'admin'
        PORTAINER_API_PASSWORD = 'P@ssowrd1234'
    }

    stages {
        stage('Checkout') {
            steps {
                script {
                    checkout scm
                }
            }
        }

        stage('Build React App') {
            steps {
                script {
                    sh 'nvm install 14'
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }

        stage('Build and Push Docker Image') {
            steps {
                script {
                    sh "docker build -t your-image-name:tag ."
                    withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId: DOCKER_REGISTRY_CREDENTIALS, usernameVariable: 'DOCKER_REGISTRY_USERNAME', passwordVariable: 'DOCKER_REGISTRY_PASSWORD']]) {
                        sh "docker login -u $DOCKER_REGISTRY_USERNAME -p $DOCKER_REGISTRY_PASSWORD"
                    }
                    sh "docker push your-image-name:tag"
                }
            }
        }

        stage('Deploy with Docker Compose') {
            steps {
                script {
                    sh "docker-compose up -d"
                }
            }
        }

        stage('Deploy to Portainer') {
            steps {
                script {
                    withCredentials([string(credentialsId: 'ptr_L0bnwbU48gui4OjSsg2zzUKNq58lmg51UjHnQ5Su7eE=', variable: 'ptr_L0bnwbU48gui4OjSsg2zzUKNq58lmg51UjHnQ5Su7eE=')]) {
                        sh '''
                            curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer $PORTAINER_API_KEY" \
                            --data-binary @portainer-stack-definition.json \
                            $PORTAINER_API/stacks?type=2
                        '''
                    }
                }
            }
        }
    }
}
