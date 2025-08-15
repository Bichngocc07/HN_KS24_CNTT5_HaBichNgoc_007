class Customer {
    private static nextId = 1;
    public id: number;
    public name: string;
    public email: string;
    public phone: string;

    constructor(name: string, email: string, phone: string) {
        this.id = Customer.nextId++;
        this.name = name;
        this.email = email;
        this.phone = phone;
    }

    getDetails(): string {
        return `ID: ${this.id} | Name: ${this.name} | Email: ${this.email} | Phone: ${this.phone}`;
    }
}

abstract class Vehicle {
    private static nextId = 1;
    public id: number;
    public type: string;
    public rentalPricePerDay: number;
    public isAvailable: boolean;

    constructor(type: string, rentalPricePerDay: number) {
        this.id = Vehicle.nextId++;
        this.type = type;
        this.rentalPricePerDay = rentalPricePerDay;
        this.isAvailable = true;
    }

    rent(): void {
        this.isAvailable = false;
    }

    returnVehicle(): void {
        this.isAvailable = true;
    }

    abstract calculateRentalCost(days: number): number;
    abstract getFeatures(): string[];
    abstract getInsurancePolicy(): string;
}


class Car extends Vehicle {
    calculateRentalCost(days: number): number {
        return days * this.rentalPricePerDay;
    }
    getFeatures(): string[] {
        return ["Điều hòa", "GPS dẫn đường"];
    }
    getInsurancePolicy(): string {
        return "Bảo hiểm toàn diện, miễn thường $500";
    }
}
//3
class Motorcycle extends Vehicle {
    calculateRentalCost(days: number): number {
        return days * this.rentalPricePerDay;
    }
    getFeatures(): string[] {
        return ["Mũ bảo hiểm đi kèm"];
    }
    getInsurancePolicy(): string {
        return "Bảo hiểm trách nhiệm dân sự cơ bản";
    }
}

class Truck extends Vehicle {
    calculateRentalCost(days: number): number {
        return days * this.rentalPricePerDay;
    }
    getFeatures(): string[] {
        return ["Thùng hàng lớn", "Bửng nâng thủy lực"];
    }
    getInsurancePolicy(): string {
        return "Bảo hiểm hàng hóa và phương tiện thương mại";
    }
}
//4
class Rental {
    private static nextId = 1;
    public rentalId: number;
    public customer: Customer;
    public vehicle: Vehicle;
    public days: number;
    public totalCost: number;

    constructor(customer: Customer, vehicle: Vehicle, days: number) {
        this.rentalId = Rental.nextId++;
        this.customer = customer;
        this.vehicle = vehicle;
        this.days = days;
        this.totalCost = vehicle.calculateRentalCost(days);
    }

    getDetails(): string {
        return `RentalID: ${this.rentalId} | Customer: ${this.customer.name} | Vehicle: ${this.vehicle.type} (${this.vehicle.id}) | Days: ${this.days} | Total: $${this.totalCost}`;
    }
}
//5
class RentalAgency {
    public vehicles: Vehicle[] = [];
    public customers: Customer[] = [];
    public rentals: Rental[] = [];

    // Thêm khách
    addCustomer(name: string, email: string, phone: string): Customer {
        const newCustomer = new Customer(name, email, phone);
        this.customers.push(newCustomer);
        console.log("Đã thêm khách hàng:", newCustomer.getDetails());
        return newCustomer;
    }

    // Thêm xe
    addVehicle(type: "Car" | "Motorcycle" | "Truck", pricePerDay: number): Vehicle {
        let vehicle: Vehicle;
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
        console.log(`Đã thêm ${type} mới (ID: ${vehicle.id}, Giá/ngày: $${pricePerDay})`);
        return vehicle;
    }

    
    rentVehicle(customerId: number, vehicleId: number, days: number): Rental | null {
        const customer = this.customers.find(c => c.id === customerId);
        const vehicle = this.vehicles.find(v => v.id === vehicleId && v.isAvailable);

        if (!customer) {
            console.log("Không tìm thấy khách hàng.");
            return null;
        }
        if (!vehicle) {
            console.log("Xe không tồn tại hoặc đã được thuê.");
            return null;
        }

        vehicle.rent();
        const rental = new Rental(customer, vehicle, days);
        this.rentals.push(rental);
        console.log("Đã tạo hợp đồng thuê:", rental.getDetails());
        return rental;
    }
}



const agency = new RentalAgency();


const diachi1 = agency.addCustomer("ngocc", "ngocc@example.com", "0917083423");
const diachi2 = agency.addCustomer("quyynh", "quyynh@example.com", "0983506935");


const xe = agency.addVehicle("Car", 50);
const loai = agency.addVehicle("Motorcycle", 15);
const co = agency.addVehicle("Truck", 80);


agency.rentVehicle(diachi1.id, xe.id, 3);
agency.rentVehicle(diachi2.id, loai.id, 5);

