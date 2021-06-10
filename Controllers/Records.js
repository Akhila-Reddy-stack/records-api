

'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var records = require('../data');
app.use(bodyParser.json());


class Records {
  async getRecordsList(req, res) {
    console.log('data', records);
    if (records) {
      res.json({ status: true, message: "Success!", data: records });
    } else {
      res.json({ status: false, message: "Failure!", data: [] });
    }
  }

  async getmanagedRecords(req, res) {
    var page = req.body.page
    var startnum = (`${page}0` - 9);
    var endnum = parseInt(`${page}0`);
    console.log(typeof (endnum), endnum, "endnum")
    var managedRecords = [];
    if (records.records) {
      await records.records.map((val, i) => {
        if (val.id >= startnum && val.id <= endnum) {
          console.log(val.id, "val")
          managedRecords.push(val)
          console.log(managedRecords, "managedRecords")
        }
      })
      res.send({ "data": managedRecords });
    }
    else {
      res.send({ "data": [] });
    }

  }


  async getIdRecords(req, res) {
    var managedRecords = [];
    if (records.records) {
      await records.records.map((val, i) => {
        if (val.id) {
          console.log(val.id, "val")
          managedRecords.push(val.id)
          console.log(managedRecords, "managedRecords")
        }
      })
      res.send({ "data": managedRecords });
    }
    else {
      res.send({ "data": [] });
    }

  }


  async getopenRecords(req, res) {
    var value = req.body.value
    var managedRecords = [];
    if (records.records) {
      await records.records.map((val, i) => {
        if (value === val.disposition) {
          managedRecords.push(val)
          console.log(managedRecords, "managedRecords")
        }
      })
      res.send({ "data": managedRecords });
    }
    else {
      res.send({ "data": [] });
    }
  }

  async getcloseRecords(req, res) {
    var value = req.body.value
    var managedRecords = [];
    if (records.records) {
      await records.records.map((val, i) => {
        if (value === val.disposition) {
          managedRecords.push(val)
          console.log(managedRecords, "managedRecords")
        }
      })
      res.send({ "data": managedRecords });
    }
    else {
      res.send({ "data":[] });
    }
  }


  async getopenRecordsCount(req, res) {
    var value = req.query.value
    console.log(value, "value")
    var managedRecords = [];
    var openCount = ""
    var openarray = []
    if (records.records) {
      await records.records.map((val, i) => {
        if (value === val.disposition) {
          managedRecords.push(val)

        }
      })
      console.log(managedRecords.length, "managedRecords")
      openCount = managedRecords.length
      console.log(openCount)
      res.send({ "Count": openCount });
    }
    else {
      res.send({ "data": 0 });
    }
  }

  async getcloseRecordsCount(req, res) {
    var value = req.query.value
    console.log(value, "value")
    var managedRecords = [];
    var closedCount = ""

    if (records.records) {
      await records.records.map((val, i) => {
        if (value === val.disposition) {
          managedRecords.push(val)
        }
      })
      console.log(managedRecords.length, "managedRecords")
      closedCount = managedRecords.length
      console.log(closedCount)
      res.send({ "Count": closedCount });
    }
    else {
      res.send({ "data": 0});
    }
  }


  async getcloseRecordsCountwithcolors(req, res) {
    var value = req.query.value
    console.log(value, "value")
    var managedRecords = [];
    var closedCount = ""

    if (records.records) {
      await records.records.map((val, i) => {
        if (val.disposition != "open" && value === val.disposition) {
          console.log(val)
          if (val.color === "red" || val.color === "yellow" || val.color === "blue")
            managedRecords.push(val)
        }
      })
      console.log(managedRecords.length, "managedRecords")
      closedCount = managedRecords.length
      console.log(closedCount)
      res.send({ "Count": closedCount });
    }
    else {
      res.send({ "data": 0 });
    }
  }






  async getpagewise(req, res) {
    var prevPage = req.body.prev
    var nextPage = req.body.next

    var managedRecords = [];

    var next = parseInt(`${nextPage}0` - 10);
    var prev = parseInt(`${prevPage}1`);
    console.log(next, prev)
    if (records.records) {
      await records.records.map((val, i) => {
        if (val.id >= prev && val.id <= next) {
          console.log(val.id, "val")
          managedRecords.push(val)
          console.log(managedRecords, "managedRecords")
        }
      })
      res.send({ "data": managedRecords });
    }
    else {
      res.send({ "data": [] });
    }
  }

}

const RecordsMaster = new Records();

module.exports = RecordsMaster;
