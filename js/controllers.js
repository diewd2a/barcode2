/* global angular, document, window */
'use strict';

angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $ionicPopover, $timeout) {
    // Form data for the login modal
    $scope.loginData = {};
    $scope.isExpanded = false;
    $scope.hasHeaderFabLeft = false;
    $scope.hasHeaderFabRight = false;

    var navIcons = document.getElementsByClassName('ion-navicon');
    for (var i = 0; i < navIcons.length; i++) {
        navIcons.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    }

    ////////////////////////////////////////
    // Layout Methods
    ////////////////////////////////////////

    $scope.hideNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'none';
    };

    $scope.showNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'block';
    };

    $scope.noHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }
    };

    $scope.setExpanded = function(bool) {
        $scope.isExpanded = bool;
    };

    $scope.setHeaderFab = function(location) {
        var hasHeaderFabLeft = false;
        var hasHeaderFabRight = false;

        switch (location) {
            case 'left':
                hasHeaderFabLeft = true;
                break;
            case 'right':
                hasHeaderFabRight = true;
                break;
        }

        $scope.hasHeaderFabLeft = hasHeaderFabLeft;
        $scope.hasHeaderFabRight = hasHeaderFabRight;
    };

    $scope.hasHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (!content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }

    };

    $scope.hideHeader = function() {
        $scope.hideNavBar();
        $scope.noHeader();
    };

    $scope.showHeader = function() {
        $scope.showNavBar();
        $scope.hasHeader();
    };

    $scope.clearFabs = function() {
        var fabs = document.getElementsByClassName('button-fab');
        if (fabs.length && fabs.length > 1) {
            fabs[0].remove();
        }
    };
})

.controller('LoginCtrl', function($scope, $timeout, $stateParams, ionicMaterialInk) {
    $scope.$parent.clearFabs();
    $timeout(function() {
        $scope.$parent.hideHeader();
    }, 0);
    ionicMaterialInk.displayEffect();
})

.controller('FriendsCtrl', function($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {
    // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.$parent.setHeaderFab('left');

    // Delay expansion
    $timeout(function() {
        $scope.isExpanded = true;
        $scope.$parent.setExpanded(true);
    }, 300);

    // Set Motion
    ionicMaterialMotion.fadeSlideInRight();

    // Set Ink
    ionicMaterialInk.displayEffect();
})

.controller('ProfileCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk) {
    // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);

    // Set Motion
    $timeout(function() {
        ionicMaterialMotion.slideUp({
            selector: '.slide-up'
        });
    }, 300);

    $timeout(function() {
        ionicMaterialMotion.fadeSlideInRight({
            startVelocity: 3000
        });
    }, 700);

    // Set Ink
    ionicMaterialInk.displayEffect();
})

.controller('ActivityCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk) {
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(true);
    $scope.$parent.setHeaderFab('right');

    $timeout(function() {
        ionicMaterialMotion.fadeSlideIn({
            selector: '.animate-fade-slide-in .item'
        });
    }, 200);

    // Activate ink for controller
    ionicMaterialInk.displayEffect();
})
.controller('TodoCtrl', function($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion,$ionicPlatform, $cordovaBadge, $cordovaBarcodeScanner) {
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.$parent.setExpanded(true);
	//$scope.$parent.hasShadow();
	$timeout(function() {
		$scope.isExpanded = false;
		$scope.$parent.setExpanded(false);
		}, 300);
		
		$scope.todoItem = [
		{id:1,topic:'รายการที่ต้องทำ 1',status:false},
		{id:2,topic:'รายการที่ต้องทำ 2',status:false},
		{id:3,topic:'รายการที่ต้องทำ 3',status:false},
		{id:4,topic:'รายการที่ต้องทำ 4',status:false},
		{id:5,topic:'รายการที่ต้องทำ 5',status:false}
		];
		$ionicPlatform.ready(function() {
			
			$scope.usescan = function(){
				
				var scanOption = {
				"preferFrontCamera" : false, 
                 "showFlipCameraButton" : true, 
 				"showTorchButton" : true, // แสดงปุ่ม icon ไฟแฟลส
                "prompt" : "ให้ตำแหน่งของ barcode อยู่ภายในพื้นที่ scan", // ข้อความกำหนดเอง
                //"formats" : "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
                "orientation" : "portrait" // การวางหน้ากล้อง (portrait|landscape)
            };
            $cordovaBarcodeScanner
                .scan(scanOption)
                .then(function(barcodeData) {
                   alert("SCANED:"+JSON.stringify(barcodeData));
                    if(barcodeData.cancelled==false){// ถ้ายังไม่ยกเลิก
                        $scope.usescan();// เรียกฟังก์ชั่น scan ซ้ำ
                    }
                    // Success! Barcode data is here
                }, function(error) {
                    alert("ERR:"+JSON.stringify(error));
                    // An error occurred
                });
        };
 
        // สร้างฟังก์ชั่นสำหรับนับรายการที่ยังไม่เช็คเลือก
        $scope.getNotComplete = function(){
            var totalNotComplate = 0;
            var item =   $scope.todoItem;
            // เนื่องจากตัวแปร $scope.todoItem ที่เรากำหนดเป็น array
            // ค่า k ใน ลูป for ด้านล่างจะ key index เริ่มตัวที่ 0
            for(var k in item){
                // ถ้ารายการนั้นมีสถานะเป็น false ให้บวกค่าเพิ่ม
                if(item[k].status == false){
                    totalNotComplate++;
                }
            }
            return totalNotComplate;
        };
 
        // ตรวจสอบการอนุญาตการแสดง badge
        $cordovaBadge.hasPermission().then(function(yes) {
            // เมื่อเริ่มต้นเข้ามาหน้านี้ ให้เรียกฟังก์ชั่น ดึงรายการที่ยังไม่เช็คทั้งหมด กำหนดเลขกำกับ
            var NotComplete = $scope.getNotComplete();
            $cordovaBadge.set(NotComplete).then(function() {
                // You have permission, badge set.
            }, function(err) {
                // You do not have permission.
            });
        }, function(no) {
            // You do not have permission
        });
 
        // สร้างฟังก์ชั่นสำหรับเรียกใช้เมื่อเปลี่ยนค่าใน checkbox ส่งค่า id และ status
        // มาด้วย โดยค่า status จะหมายถึงค่าสะานะของการเช็คเลือก
        $scope.settodo = function (id, status) {
            // ถ้าถูกเช็คเลือก จำนวนรายการที่ยังไม่เช็คก็จะลดลง
            if(status == true){
                // ให้ลดจำนวน ในที่นี้ใช้ decrease() ไม่กำหนดจำนวน จะเป็นการลดทีละ 1
                $cordovaBadge.decrease().then(function() {
                    // You have permission, badge decreased.
                }, function(err) {
                    // You do not have permission.
                });
            }else{ // ถ้าเช็คออก หรือ status การเปลี่ยนเป็น false
                // ให้เพิ่มจำนวน ในที่นี้ใช้ increase() ไม่กำหนดจำนวน จะเป็นการเพิ่มทีละ 1
                $cordovaBadge.increase().then(function() {
                    // You have permission, badge increased.
                }, function(err) {
                    // You do not have permission.
                });
            }
        };
 
    });
 
    ionicMaterialMotion.fadeSlideInRight();
 
    ionicMaterialInk.displayEffect();
 
})
.controller('GalleryCtrl', function($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(true);
    $scope.$parent.setHeaderFab(false);

    // Activate ink for controller
    ionicMaterialInk.displayEffect();

    ionicMaterialMotion.pushDown({
        selector: '.push-down'
    });
    ionicMaterialMotion.fadeSlideInRight({
        selector: '.animate-fade-slide-in .item'
    });

})

;
