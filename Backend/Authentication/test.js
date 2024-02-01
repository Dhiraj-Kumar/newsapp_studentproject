const chai = require('chai');
const server = require('./server');
const chaiHttp = require('chai-http');


chai.should();
chai.use(chaiHttp);

describe('Auth testing', () => {
    //get api
    describe('Registration Test', () => {
        it('it should register the user in th DB', (done) => {
            const data = {
                "firstname": "Akshaya",
                "lastname": "Renganathan",
                "email": "rengacanon@gmail.com",
                "ans1": "volleyball",
                "password": "akshaya6789"
            }
            chai.request(server)
                .post('/api/v1/register')
                .send(data)
                .end(async (err, res) => {
                    user = await res.body.user
                    // console.log(user)
                    res.should.have.status(200);
                    await res.body.should.be.a('object');
                    await user.should.have.property('email')
                    await user.should.have.property('ans1')
                    await user.should.have.property('password')
                    done();
                })
        })

        it('it should not register if user is already registered with that email', (done) => {
            const data = {
                "firstname": "akash",
                "lastname": "dhankani",
                "email": "rengacanon@gmail.com",
                "ans1": "sky",
                "password": "guitarist65"
            }
            chai.request(server)
                .post('/api/v1/register')
                .send(data)
                .end((err, res) => {
                    // user = res.body.user
                    res.should.have.status(409)
                    done()
                })
        })
    })

    describe('Login Test', () => {
        it("it should login the user", (done) => {
            const cred = {
                "email": "rengacanon@gmail.com",
                "password": "akshaya6789"
            }
            chai.request(server)
                .post('/api/v1/login')
                .send(cred)
                .end((err, res) => {

                    res.should.have.status(200)
                    res.body.should.be.a('object');
                    res.body.should.have.property('token')
                    res.body.should.have.property('username')
                    res.body.should.have.property('fn')
                    res.body.should.have.property('ln')

                    done()
                })
        })

        it('it should not login if credentials are wrong', (done) => {

            const cred = {
                "email": "rengacanon@gmail.com",
                "password": "akshaya56"
            }
            chai.request(server)
                .post('/api/v1/login')
                .send(cred)
                .end((err, res) => {

                    res.should.have.status(404)
                    // res.body.should.be.a(jwtoken);

                    done()
                })
        })

    })

    describe('isAuthenticated test', () => {
        it('it should return true if user is authenticated', (done) => {

            const cred = {
                "email": "rengacanon@gmail.com",
                "password": "akshaya6789"
            }
            chai.request(server)
                .post('/api/v1/login')
                .send(cred)
                .end((err, res) => {
                    jwtoken = res.body.token
                    const header = {
                        "headers": `jwt=${jwtoken}`
                    }
                    chai.request(server)
                        .post('/api/v1/isAuthenticated')
                        .send(header)
                        .end((err, res) => {
                            let auth = res.body.isAuthenticated
                            res.should.have.status(200)
                            auth.should.be.equal(true)

                            done()
                        })

                })

        })
        it('it should return false if user is not authenticated', (done) => {
            const header = {
                "headers": ""
            }
            chai.request(server)
                .post('/api/v1/isAuthenticated')
                .send(header)
                .end((err, res) => {
                    let auth = res.body.isAuthenticated
                    // res.should.have.status(200)
                    auth.should.be.equal(false)

                    done()
                })
        })
    })

    describe('ChangePassword Test', () => {
        it('password should be changed if old password is correct', (done) => {
            const psd = {
                "oldpassword": "akshaya6789",
                "newpassword": "akshaya643"
            }
            const username = "rengacanon@gmail.com"
            chai.request(server)
                .post(`/api/v1/changePassword/${username}`)
                .send(psd)
                .end((err, res) => {
                    res.should.have.status(200)
                    done()
                })
        })

        it('password should not be changed if old password is incorrect', (done) => {
            const psd = {
                "oldpassword": "aksjauay",
                "newpassword": "akshaya678"
            }
            const username = "rengacanon@gmail.com"
            chai.request(server)
                .post(`/api/v1/changePassword/${username}`)
                .send(psd)
                .end((err, res) => {
                    res.should.have.status(404)
                    done()
                })
        })
    })

    describe('verify user and reset the forgot password Test', () => {
        it('only verified user can reset the forgot password', (done) => {
            const data = {
                "email": "rengacanon@gmail.com",
                "ans1": "volleyball"
            }
            chai.request(server)
                .post('/api/v1/verifyUser')
                .send(data)
                .end((err, res) => {
                    let user = res.body.user
                    res.should.be.status(200)
                    res.body.should.be.a('object');
                    res.body.should.have.property('user')

                    const newpassword = {
                        "password": "akshaya567"
                    }

                    chai.request(server)
                        .post(`/api/v1/forgotPassword/${user}`)
                        .send(newpassword)
                        .end((err, res) => {
                            res.should.be.status(200)
                            res.body.should.be.a('object');
                            res.body.should.have.property('message')
                            done()
                        })

                })
        })

        it('if email or security answer is incorrect then not verified', (done) => {
            const data = {
                "email": "rengacanon@gmail.com",
                "ans1": "sk"
            }
            chai.request(server)
                .post('/api/v1/verifyUser')
                .send(data)
                .end((err, res) => {
                    res.should.be.status(401)
                    res.body.should.be.a('object');
                    res.body.should.have.property('message')
                    done()
                })
        })
    })


})