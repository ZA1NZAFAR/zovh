pipeline {
    agent {label 'saturn'}

    environment {
        REPO_URL = 'https://github.com/ZA1NZAFAR/zovh.git'
        BASE_DIR = '/var/www/zain.ovh'
        DEPLOY_DIR = "${BASE_DIR}/public_html"
        BRANCH = 'main'  // Branch to clone
    }

    stages {
        stage('Empty Deployment Directory') {
            steps {
                script {
                    // Clean the existing deployment directory
                    sh '''
                    echo "Emptying deployment directory..."
                    sudo rm -rf ${BASE_DIR}/*
                    '''
                }
            }
        }

        stage('Clone Repository') {
            steps {
                script {
                    // Clone the repository directly into the deployment directory
                    sh '''
                    echo "Cloning repository..."
                    git clone -b ${BRANCH} ${REPO_URL} ${DEPLOY_DIR}
                    '''
                }
            }
        }

        stage('Restart Apache') {
            steps {
                script {
                    // Restart Apache2 to reflect changes
                    sh '''
                    echo "Restarting Apache2 service..."
                    sudo systemctl restart apache2
                    '''
                }
            }
        }
    }

    post {
        success {
            echo 'Website deployed successfully!'
        }
        failure {
            echo 'Deployment failed.'
        }
    }
}
