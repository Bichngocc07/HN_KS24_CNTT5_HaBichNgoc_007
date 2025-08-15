var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Customer = /** @class */ (function () {
    function Customer(name, email, phone) {
        this.id = Customer.nextId++;
        this.name = name;
        this.email = email;
        this.phone = phone;
    }
    Customer.prototype.getDetails = function () {
        return "ID: ".concat(this.id, " | Name: ").concat(this.name, " | Email: ").concat(this.email, " | Phone: ").concat(this.phone);
    };
    Customer.nextId = 1;
    return Customer;
}());
var Vehicle = /** @class */ (function () {
    function Vehicle(type, rentalPricePerDay) {
        this.id = Vehicle.nextId++;
        this.type = type;
        this.rentalPricePerDay = rentalPricePerDay;
        this.isAvailable = true;
    }
    Vehicle.prototype.rent = function () {
        this.isAvailable = false;
    };
    Vehicle.prototype.returnVehicle = function () {
        this.isAvailable = true;
    };
    Vehicle.nextId = 1;
    return Vehicle;
}());
var Car = /** @class */ (function (_super) {
    __extends(Car, _super);
    function Car() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Car.prototype.calculateRentalCost = function (days) {
        return days * this.rentalPricePerDay;
    };
    Car.prototype.getFeatures = function () {
        return ["Điều hòa", "GPS dẫn đường"];
    };
    Car.prototype.getInsurancePolicy = function () {
        return "Bảo hiểm toàn diện, miễn thường $500";
    };
    return Car;
}(Vehicle));
//3
var Motorcycle = /** @class */ (function (_super) {
    __extends(Motorcycle, _super);
    function Motorcycle() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Motorcycle.prototype.calculateRentalCost = function (days) {
        return days * this.rentalPricePerDay;
    };
    Motorcycle.prototype.getFeatures = function () {
        return ["Mũ bảo hiểm đi kèm"];
    };
    Motorcycle.prototype.getInsurancePolicy = function () {
        return "Bảo hiểm trách nhiệm dân sự cơ bản";
    };
    return Motorcycle;
}(Vehicle));
var Truck = /** @class */ (function (_super) {
    __extends(Truck, _super);
    function Truck() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Truck.prototype.calculateRentalCost = function (days) {
        return days * this.rentalPricePerDay;
    };
    Truck.prototype.getFeatures = function () {
        return ["Thùng hàng lớn", "Bửng nâng thủy lực"];
    };
    Truck.prototype.getInsurancePolicy = function () {
        return "Bảo hiểm hàng hóa và phương tiện thương mại";
    };
    return Truck;
}(Vehicle));
//4
var Rental = /** @class */ (function () {
    function Rental(customer, vehicle, days) {
        this.rentalId = Rental.nextId++;
        this.customer = customer;
        this.vehicle = vehicle;
        this.days = days;
        this.totalCost = vehicle.calculateRentalCost(days);
    }
    Rental.prototype.getDetails = function () {
        return "RentalID: ".concat(this.rentalId, " | Customer: ").concat(this.customer.name, " | Vehicle: ").concat(this.vehicle.type, " (").concat(this.vehicle.id, ") | Days: ").concat(this.days, " | Total: $").concat(this.totalCost);
    };
    Rental.nextId = 1;
    return Rental;
}());
//5
var RentalAgency = /** @class */ (function () {
    function RentalAgency() {
        this.vehicles = [];
        this.customers = [];
        this.rentals = [];
    }
    // Thêm khách
    RentalAgency.prototype.addCustomer = function (name, email, phone) {
        var newCustomer = new Customer(name, email, phone);
        this.customers.push(newCustomer);
        console.log("Đã thêm khách hàng:", newCustomer.getDetails());
        return newCustomer;
    };
    // Thêm xe
    RentalAgency.prototype.addVehicle = function (type, pricePerDay) {
        var vehicle;
        switch (type) {
            case "Car":
                vehicle = new Car(type, pricePerDay);
                break;
            case "Motorcycle":
                vehicle = new Motorcycle(type, pricePerDay);
                break;
            case "Truck":
                vehicle = new Truck(type, pricePerDay);
                break;
        }
        this.vehicles.push(vehicle);
        console.log("\u0110\u00E3 th\u00EAm ".concat(type, " m\u1EDBi (ID: ").concat(vehicle.id, ", Gi\u00E1/ng\u00E0y: $").concat(pricePerDay, ")"));
        return vehicle;
    };
    RentalAgency.prototype.rentVehicle = function (customerId, vehicleId, days) {
        var customer = this.customers.find(function (c) { return c.id === customerId; });
        var vehicle = this.vehicles.find(function (v) { return v.id === vehicleId && v.isAvailable; });
        if (!customer) {
            console.log("Không tìm thấy khách hàng.");
            return null;
        }
        if (!vehicle) {
            console.log("Xe không tồn tại hoặc đã được thuê.");
            return null;
        }
        vehicle.rent();
        var rental = new Rental(customer, vehicle, days);
        this.rentals.push(rental);
        console.log("Đã tạo hợp đồng thuê:", rental.getDetails());
        return rental;
    };
    return RentalAgency;
}());
var agency = new RentalAgency();
var diachi1 = agency.addCustomer("ngocc", "ngocc@example.com", "0917083423");
var diachi2 = agency.addCustomer("quyynh", "quyynh@example.com", "0983506935");
var xe = agency.addVehicle("Car", 50);
var loai = agency.addVehicle("Motorcycle", 15);
var co = agency.addVehicle("Truck", 80);
agency.rentVehicle(diachi1.id, xe.id, 3);
agency.rentVehicle(diachi2.id, loai.id, 5);
