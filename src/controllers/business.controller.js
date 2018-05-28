const Business = require('../models/business.model');
const Address = require('../models/address.model');
const Offer = require('../models/offer.model');
const User = require('../models/user.model');
const mongoose = require('mongoose');
const fs = require('fs');


module.exports = {
    addBusiness: (req, res, next) => {
        const receivedBusiness = req.body;
        //receivedBusiness.cover = req.file.path;
        let newAddress = new Address({
            _id: mongoose.Types.ObjectId(),
            lng: receivedBusiness.address.lng,
            lat: receivedBusiness.address.lat,
            street: receivedBusiness.address.street,
            city: receivedBusiness.address.city,
            state: receivedBusiness.address.state,
            zip_code: receivedBusiness.address.zip_code
        });
        newAddress.save()
            .then(result => {
                let newBusiness = new Business({
                    _id: mongoose.Types.ObjectId(),
                    category: receivedBusiness.category,
                    owner : receivedBusiness.owner,
                    name: receivedBusiness.name,
                    facebook: receivedBusiness.facebook,
                    whatsapp: receivedBusiness.whatsapp,
                    instagram: receivedBusiness.instagram,
                    youtube: receivedBusiness.youtube,
                    address: new mongoose.Types.ObjectId(result._id),
                    cover: receivedBusiness.cover,
                    valid: receivedBusiness.valid,
                    score: receivedBusiness.score,
                    offers: receivedBusiness.offers,
                    district: receivedBusiness.district,
                    website: receivedBusiness.website,
                    capacity: receivedBusiness.capacity,
                    phone: receivedBusiness.phone,
                    workingHours: receivedBusiness.workingHours,
                    email: receivedBusiness.email
                });
                newBusiness.save()
                    .then(result => {
                        res.status(200).json({message: 'business added successfully'});
                    })
                    .catch(error => {
                        res.status(500).json({error: error.message});
                    });
            });
    },
    validateBusiness: (req, res, next) => {
        Business.findOne({_id: req.params.id})
            .then(result => {
                const updateOps = {valid: true};
                Business.update({_id: result._id}, {$set: updateOps})
                    .then(result => {
                        res.status(200).json({message: 'business validated successfully'});
                    })
                    .catch(error => {
                        res.status(500).json({error: error.message});
                    });
            })
            .catch(error => {
                res.status(404).json({error: 'business not found'});
            });
    },
    invalidateBusiness: (req, res, next) => {
        Business.findOne({_id: req.params.id})
            .then(result => {
                const updateOps = {valid: false};
                Business.update({_id: result._id}, {$set: updateOps})
                    .then(result => {
                        res.status(200).json({message: 'business validated successfully'});
                    })
                    .catch(error => {
                        res.status(500).json({error: error.message});
                    });
            })
            .catch(error => {
                res.status(404).json({error: 'business not found'});
            });
    },
    updateBusiness: (req, res, next) => {
        Business.findOne({_id: req.params.id}).then(result => {
            const updateOps = {};
            for (var key in req.body) {
                if (req.body.hasOwnProperty(key)) {
                    updateOps[key] = req.body[key];
                }
            }
            Business.update({_id: result._id}, {$set: updateOps})
                .then(result => {
                    res.status(200).json({message: 'business updated successfully'});
                })
                .catch(error => {
                    res.status(500).json({error: error.message});
                });
        })
            .catch(error => {
                res.status(404).json({error: 'business not found'});
            });
    },
    deleteBusiness: (req, res, next) => {
        Business.findOne({_id: req.params.id})
            .then(result => {
                console.log(result);
                Address.findOne({_id: result.address})
                    .then(AddressResult => {
                        Business.remove({_id: result.id})
                            .then(result => {
                                Address.remove({_id: AddressResult.id})
                                    .then(result => {
                                        res.status(200).json({message: 'business deleted successfully'});
                                    })
                                    .catch(error => {
                                        res.status(500).json({error: 'could not remove associated address'});
                                    });
                            })
                            .catch(error => {
                                res.status(500).json({error: error.message});
                            });
                    })
                    .catch(error => {
                        res.status(500).json({error: 'address could not be deleted'});
                    });
            })
            .catch(error => {
                res.status(404).json({error: 'business not found'});
            });
    },
    getAllValidBusiness: (req, res, next) => {
        Business.find({valid: true})
            .then(result => {
                if (result.count() != 0)
                    res.status(200).json(result);
                else
                    res.status(404).json({error: '0 valid business were found'});
            })
            .catch(error => {
                res.status(500).json({error: error.message});
            });
    },
    getAllInvalidBusiness: (req, res, next) => {
        Business.find({valid: false})
            .then(result => {
                if (result.count() != 0)
                    res.status(200).json(result);
                else
                    res.status(404).json({error: '0 invalid business were found'});
            })
            .catch(error => {
                res.status(500).json({error: error.message});
            });
    },
    getAllBusiness: (req, res, next) => {
        Business.find()
            .populate({path: 'address', model: Address})
            .populate({path: 'offers', model: Offer})
            .populate({path: 'owner', model: User})
            .then(result => {
                if (result.count != 0)
                    res.status(200).json(result);
                else
                    res.status(404).json({error: '0 business were found'});
            })
            .catch(error => {
                res.status(500).json({error: error.message});
            });
    },
    getBusinessById: (req, res, next) => {
        Business.findOne({_id: req.params.id})
            .populate({path: 'address', model: Address})
            .populate({path: 'offers', model: Offer})
            .populate({path: 'owner', model: User})
            .then(result => {
                res.status(200).json(result);
            })
            .catch(error => {
                res.status(404).json(error);
            });
    },
    evaluateBusiness: (req, res, next) => {

    },
    getBusinessByDistrict: (req, res, next) => {
        Business.find({district: req.params.district})
            .populate({path: 'address', model: Address})
            .populate({path: 'offers', model: Offer})
            .populate({path: 'owner', model: User})
            .then(result => {
                res.status(200).json(result);
            })
            .catch(error => {
                res.status(404).json(error)
            });
    },
    getBusinessByOwner: (req, res, next) => {
        Business.find({owner: req.params.owner})
            .populate({path: 'address', model: Address})
            .populate({path: 'offers', model: Offer})
            .populate({path: 'owner', model: User})
            .then(result => {
                res.status(200).json(result);
            })
            .catch(error => {
                res.status(404).json(error)
            });
    },
    addImages: (req, res, next) => {
        Business.findOne({_id: req.params.id})
            .then(result => {
                let images = req.files.map(f => {
                    console.log(f);
                    return req.protocol + '://' + req.get('host')+  '/' + f.filename;
                    //return path.join(__dirname, '../..', f.path);
                });
                images = images.concat(result.images);
                Business.update({_id: result._id}, {$set: {images: images}})
                    .then(result => {
                        res.status(200).json({message: 'images added successfully'});
                    })
                    .catch(error => {
                        res.status(500).json({error: error.message});
                    });
            })
            .catch(error => {
                res.status(404).json({message: error.message});
            });
    },
    deleteImage: (req, res, next) => {
        const di = req.body.image;
        Business.findOne({_id: req.params.id})
            .then(result => {
                let images = result.images.filter(i => i !== di)
                Business.update({_id: result._id}, {$set: {images: images}})
                    .then(result => {
                        fs.unlink(di, (err) => {
                            if (err) throw err;
                        });
                        res.status(200).json({message: 'image deleted successfully'});
                    })
                    .catch(error => {
                        res.status(500).json({message: error.message});
                    });
            })
            .catch(error => {
                res.status(500).json({message: error.message});
            })
    },
    addOffer: (req, res, next) => {
        const receivedOffer = req.body;
        let newOffer = new Offer({
            _id: mongoose.Types.ObjectId(),
            name: receivedOffer.name,
            type: receivedOffer.type,
            period: receivedOffer.period,
            options: receivedOffer.options,
            content: receivedOffer.content
        });
        Business.findOne({_id: req.params.id})
            .then(business => {
                newOffer.save()
                    .then(result => {
                        business.offers.push(result._id);
                        console.log(business.offers);
                        Business.update({_id: business._id}, business)
                            .then(result => {
                                res.status(200).json({message: 'offer added successfully'});
                            })
                            .catch(error => {
                                res.status(500).json({message: error.message});
                            })
                    })
                    .catch(error => {
                        res.status(500).json({message: error.message});
                    })
            })
            .catch(error => {
                res.status(500).json({message: error.message});
            })
    },
    updateOffer: (req, res, next) => {
        Offer.findOne({_id: req.params.id})
            .then(result => {
                const updateOps = {};
                for (var key in req.body) {
                    if (req.body.hasOwnProperty(key)) {
                        updateOps[key] = req.body[key];
                    }
                }
                Offer.update({_id: result._id}, {$set: updateOps})
                    .then(result => {
                        res.status(200).json({message: 'offer updated successfully'});
                    })
                    .catch(error => {
                        res.status(500).json({error: error.message});
                    });
            })
            .catch(error => {
                res.status(404).json({error: 'offer not found'});
            });
    },
    deleteOffer: (req, res, next) => {
        Offer.findOne({_id: req.params.id})
            .then(result => {
                Offer.remove({_id: result._id})
                    .then(result => {
                        res.status(200).json({message: 'offer deleted successfully'});
                    })
                    .catch(error => {
                        res.status(500).json({error: 'could not delete offer'});
                    });
            })
            .catch(error => {
                res.status(404).json({error: 'could not find offer'});
            })
    },
}