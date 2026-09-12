pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/SanjayMurugan2025/CloudOps-CICD.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('Build React App') {
            steps {
                bat 'npm run build'
            }
        }

        stage('SonarQube Analysis') {
            steps {
                script {
                    def scannerHome = tool 'SonarScanner'

                    withSonarQubeEnv('SonarQube') {
                        withCredentials([string(credentialsId: 'sonarqube-token', variable: 'SONAR_TOKEN')]) {
                            bat "\"${scannerHome}\\bin\\sonar-scanner.bat\" -Dsonar.token=%SONAR_TOKEN%"
                        }
                    }
                }
            }
        }

        stage('Quality Gate') {
            steps {
                timeout(time: 5, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: true
                }
            }
        }

        stage('Docker Build') {
            steps {
                bat 'docker build -t cloudops-react:latest .'
            }
        }

        stage('Trivy Scan') {
            steps {
                bat 'C:\\trivy\\trivy.exe image --exit-code 1 --severity HIGH,CRITICAL cloudops-react:latest'
            }
        }
        stage('Docker Hub Push') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-credentials',
                    usernameVariable: 'DOCKER_USERNAME',
                    passwordVariable: 'DOCKER_PASSWORD'
                )]) {
                    bat '''
                        docker login -u %DOCKER_USERNAME% -p %DOCKER_PASSWORD%
                        docker tag cloudops-react:latest %DOCKER_USERNAME%/cloudops-react:latest
                        docker push %DOCKER_USERNAME%/cloudops-react:latest
                        docker logout
                    '''
                }
            }
        }
    }
}