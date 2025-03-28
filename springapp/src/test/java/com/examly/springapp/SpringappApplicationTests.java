package com.examly.springapp;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.examly.springapp.model.Transaction;
import com.examly.springapp.model.ClothingItem;
import com.examly.springapp.model.User;
import com.examly.springapp.repository.ClothingItemRepository;
import com.examly.springapp.repository.UserRepository;
import com.examly.springapp.service.TransactionService;
import com.examly.springapp.service.ClothingItemService;
import com.examly.springapp.service.UserService;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.junit.jupiter.api.MethodOrderer.OrderAnnotation;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.Comparator;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@AutoConfigureMockMvc
class SpringappApplicationTests {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserService userService;

    @MockBean
    private ClothingItemService clothingItemService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ClothingItemRepository clothingItemRepository;

    @MockBean
    private TransactionService transactionService;

    @BeforeEach
    public void setup() {
        // Optionally, clean the database before each test
    }

    @AfterEach
    public void cleanup() {
        // Optionally, clean the database after each test
        userRepository.deleteAll();
    }

     // Test for ClothingItem entity with @JsonInclude annotation
     @Order(1)
     @Test
     void Annotation_testClothingItemHasJsonIncludeAnnotation() throws Exception {
         // Path to the ClothingItem entity file
         Path entityFilePath = Paths.get("src/main/java/com/examly/springapp/model/ClothingItem.java");
 
         // Read the content of the entity file as a string
         String entityFileContent = Files.readString(entityFilePath);
 
         // Check if @JsonInclude annotation exists
         assertTrue(entityFileContent.contains("@JsonInclude"), "ClothingItem entity should contain @JsonInclude annotation");
     }
 
     // Test for ClothingItem entity with @Id annotation
     @Order(2)
     @Test
     void Annotation_testClothingItemHasIdAnnotation() throws Exception {
         // Path to the ClothingItem entity file
         Path entityFilePath = Paths.get("src/main/java/com/examly/springapp/model/ClothingItem.java");
 
         // Read the content of the entity file as a string
         String entityFileContent = Files.readString(entityFilePath);
 
         // Check if @Id annotation exists
         assertTrue(entityFileContent.contains("@Id"), "ClothingItem entity should contain @Id annotation");
     }
 
     // Test for User entity with @Entity annotation
     @Order(3)
     @Test
     void Annotation_testUserHasEntityAnnotation() throws Exception {
         // Path to the User entity file
         Path entityFilePath = Paths.get("src/main/java/com/examly/springapp/model/User.java");
 
         // Read the content of the entity file as a string
         String entityFileContent = Files.readString(entityFilePath);
 
         // Check if @Entity annotation exists
         assertTrue(entityFileContent.contains("@Entity"), "User entity should contain @Entity annotation");
     }
 
     // Test for ClothingItem entity with @Entity annotation
     @Order(4)
     @Test
     void Annotation_testClothingItemHasEntityAnnotation() throws Exception {
         // Path to the ClothingItem entity file
         Path entityFilePath = Paths.get("src/main/java/com/examly/springapp/model/ClothingItem.java");
 
         // Read the content of the entity file as a string
         String entityFileContent = Files.readString(entityFilePath);
 
         // Check if @Entity annotation exists
         assertTrue(entityFileContent.contains("@Entity"), "ClothingItem entity should contain @Entity annotation");
     }
 
     // Test for User entity with @Table annotation
     @Order(5)
     @Test
     void Annotation_testUserHasTableAnnotation() throws Exception {
         // Path to the User entity file
         Path entityFilePath = Paths.get("src/main/java/com/examly/springapp/model/User.java");
 
         // Read the content of the entity file as a string
         String entityFileContent = Files.readString(entityFilePath);
 
         // Check if @Table annotation exists
         assertTrue(entityFileContent.contains("@Table"), "User entity should contain @Table annotation");
     }
 
     // Test for ClothingItem entity with @Table annotation
     @Order(6)
     @Test
     void Annotation_testClothingItemHasTableAnnotation() throws Exception {
         // Path to the ClothingItem entity file
         Path entityFilePath = Paths.get("src/main/java/com/examly/springapp/model/ClothingItem.java");
 
         // Read the content of the entity file as a string
         String entityFileContent = Files.readString(entityFilePath);
 
         // Check if @Table annotation exists
         assertTrue(entityFileContent.contains("@Table"), "ClothingItem entity should contain @Table annotation");
     }
 
     // Test for User entity with @JsonIgnore annotation
     @Order(7)
     @Test
     void Annotation_testUserHasJsonIgnoreAnnotation() throws Exception {
         // Path to the User entity file
         Path entityFilePath = Paths.get("src/main/java/com/examly/springapp/model/User.java");
 
         // Read the content of the entity file as a string
         String entityFileContent = Files.readString(entityFilePath);
 
         // Check if @JsonIgnore annotation exists (for sensitive data like password)
         assertTrue(entityFileContent.contains("@JsonIgnore"), "User entity should contain @JsonIgnore annotation");
     }

     // Test for UserRepository
     @Order(8)
     @Test
     void Repository_testUserRepository() throws Exception {
         // Path to the UserRepository file
         Path entityFilePath = Paths.get("src/main/java/com/examly/springapp/repository/UserRepository.java");
 
         // Assert that the file exists
         assertTrue(Files.exists(entityFilePath), "UserRepository file should exist");
     }
 
     // Test for ClothingItemRepository
     @Order(9)
     @Test
     void Repository_testClothingItemRepository() throws Exception {
         // Path to the ClothingItemRepository file
         Path entityFilePath = Paths.get("src/main/java/com/examly/springapp/repository/ClothingItemRepository.java");
 
         // Assert that the file exists
         assertTrue(Files.exists(entityFilePath), "ClothingItemRepository file should exist");
     }
 
     // Test for TransactionRepository
     @Order(10)
     @Test
     void Repository_testTransactionRepository() throws Exception {
         // Path to the TransactionRepository file
         Path entityFilePath = Paths.get("src/main/java/com/examly/springapp/repository/TransactionRepository.java");
 
         // Assert that the file exists
         assertTrue(Files.exists(entityFilePath), "TransactionRepository file should exist");
     }

    @Order(11)
    @Test
    void CRUD_testCreateUser() throws Exception {
        User user = new User(null, "John Doe", "johndoe@example.com", new HashSet<>());
        User savedUser = new User(1L, "John Doe", "johndoe@example.com", new HashSet<>());

        when(userService.saveUser(Mockito.any(User.class))).thenReturn(savedUser);

        mockMvc.perform(post("/api/users")
                .contentType(MediaType.APPLICATION_JSON)
                .content(new ObjectMapper().writeValueAsString(user)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(savedUser.getId()))
                .andExpect(jsonPath("$.name").value(savedUser.getName()))
                .andExpect(jsonPath("$.email").value(savedUser.getEmail()));

        verify(userService, times(1)).saveUser(Mockito.any(User.class));
    }

    @Order(12)
    @Test
    void CRUD_testGetAllUsers() throws Exception {
        List<User> users = Arrays.asList(
                new User(1L, "John Doe", "johndoe@example.com", null),
                new User(2L, "Jane Doe", "janedoe@example.com", null)
        );

        when(userService.getAllUsers()).thenReturn(users);

        mockMvc.perform(get("/api/users"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(users.size()))
                .andExpect(jsonPath("$[0].name").value("John Doe"))
                .andExpect(jsonPath("$[1].name").value("Jane Doe"));

        verify(userService, times(1)).getAllUsers();
    }

    @Order(13)
    @Test
    void CRUD_testGetUserById() throws Exception {
        Long userId = 1L;
        User user = new User(userId, "John Doe", "johndoe@example.com", null);

        when(userService.getUserById(userId)).thenReturn(user);

        mockMvc.perform(get("/api/users/{id}", userId))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("John Doe"));

        verify(userService, times(1)).getUserById(userId);
    }

    @Order(14)
    @Test
    void CRUD_testUpdateUser() throws Exception {
        Long userId = 1L;
        User userDetails = new User(userId, "John Doe Updated", "johnupdated@example.com", null);

        when(userService.getUserById(userId)).thenReturn(new User(userId, "John Doe", "johndoe@example.com", null));
        when(userService.saveUser(Mockito.any(User.class))).thenReturn(userDetails);

        mockMvc.perform(put("/api/users/{id}", userId)
                .contentType(MediaType.APPLICATION_JSON)
                .content(new ObjectMapper().writeValueAsString(userDetails)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("John Doe Updated"))
                .andExpect(jsonPath("$.email").value("johnupdated@example.com"));

        verify(userService, times(1)).saveUser(Mockito.any(User.class));
    }

    @Order(15)
    @Test
    void CRUD_testDeleteUser() throws Exception {
        Long userId = 1L;

        doNothing().when(userService).deleteUser(userId);

        mockMvc.perform(delete("/api/users/{id}", userId))
                .andExpect(status().isNoContent());

        verify(userService, times(1)).deleteUser(userId);
    }

    @Order(16)
    @Test
    void CRUD_testCreateClothingItem() throws Exception {
        ClothingItem clothingItem = new ClothingItem(null, "T-Shirt", "M", null);
        ClothingItem savedClothingItem = new ClothingItem(1L, "T-Shirt", "M", null);

        when(clothingItemService.saveClothingItem(Mockito.any(ClothingItem.class))).thenReturn(savedClothingItem);

        mockMvc.perform(post("/api/clothing-items")
                .contentType(MediaType.APPLICATION_JSON)
                .content(new ObjectMapper().writeValueAsString(clothingItem)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(savedClothingItem.getId()))
                .andExpect(jsonPath("$.description").value(savedClothingItem.getDescription()))
                .andExpect(jsonPath("$.size").value(savedClothingItem.getSize()));

        verify(clothingItemService, times(1)).saveClothingItem(Mockito.any(ClothingItem.class));
    }

    @Order(17)
    @Test
    void CRUD_testDeleteClothingItem() throws Exception {
        Long clothingItemId = 1L;

        doNothing().when(clothingItemService).deleteClothingItem(clothingItemId);

        mockMvc.perform(delete("/api/clothing-items/{id}", clothingItemId))
                .andExpect(status().isNoContent());

        verify(clothingItemService, times(1)).deleteClothingItem(clothingItemId);
    }
    
    
    @Order(19)
@Test
void CRUD_testGetClothingItemById() throws Exception {
    Long clothingItemId = 1L;
    ClothingItem clothingItem = new ClothingItem(clothingItemId, "Shirt", "M", null);

    // Mock the service method to return the clothing item by ID
    when(clothingItemService.getClothingItemById(clothingItemId)).thenReturn(clothingItem);

    // Perform the GET request and verify the response
    mockMvc.perform(get("/api/clothing-items/{id}", clothingItemId))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.description").value("Shirt"))
            .andExpect(jsonPath("$.size").value("M"));

    // Verify that the service method was called exactly once
    verify(clothingItemService, times(1)).getClothingItemById(clothingItemId);
}

@Order(20)
@Test
void CRUD_testUpdateClothingItem() throws Exception {
    Long clothingItemId = 1L;
    ClothingItem existingClothingItem = new ClothingItem(clothingItemId, "Shirt", "M", null);
    ClothingItem updatedClothingItem = new ClothingItem(clothingItemId, "Updated Shirt", "L", null);

    // Mock the service method to return the updated clothing item
    when(clothingItemService.saveClothingItem(Mockito.any(ClothingItem.class))).thenReturn(updatedClothingItem);

    // Perform the PUT request to update the clothing item and verify the response
    mockMvc.perform(put("/api/clothing-items/{id}", clothingItemId)
            .contentType(MediaType.APPLICATION_JSON)
            .content(new ObjectMapper().writeValueAsString(updatedClothingItem))) // Convert the updated ClothingItem object to JSON
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.description").value("Updated Shirt"))
            .andExpect(jsonPath("$.size").value("L"));

    // Verify that the service method was called exactly once
    verify(clothingItemService, times(1)).saveClothingItem(Mockito.any(ClothingItem.class));
}

@Order(21)
@Test
void CRUD_testGetAllTransactions() throws Exception {
    List<Transaction> transactions = Arrays.asList(
            new Transaction(1L, 1L, 1L, new Date(), 100.0),
            new Transaction(2L, 2L, 2L, new Date(), 150.0)
    );

    when(transactionService.getAllTransactions()).thenReturn(transactions);

    mockMvc.perform(get("/api/transactions"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.length()").value(transactions.size()))
            .andExpect(jsonPath("$[0].transactionAmount").value(100.0))
            .andExpect(jsonPath("$[1].transactionAmount").value(150.0));

    verify(transactionService, times(1)).getAllTransactions();
}

@Order(22)
@Test
void CRUD_testGetTransactionById() throws Exception {
    Long transactionId = 1L;
    Transaction transaction = new Transaction(transactionId, 1L, 1L, new Date(), 100.0);

    when(transactionService.getTransactionById(transactionId)).thenReturn(transaction);

    mockMvc.perform(get("/api/transactions/{id}", transactionId))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.transactionAmount").value(100.0));

    verify(transactionService, times(1)).getTransactionById(transactionId);
}

@Order(23)
@Test
void CRUD_testCreateTransaction() throws Exception {
    Transaction transaction = new Transaction(null, 1L, 1L, new Date(), 100.0);
    Transaction savedTransaction = new Transaction(1L, 1L, 1L, new Date(), 100.0);

    when(transactionService.saveTransaction(Mockito.any(Transaction.class))).thenReturn(savedTransaction);

    mockMvc.perform(post("/api/transactions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(new ObjectMapper().writeValueAsString(transaction)))
            .andExpect(status().isCreated())
            .andExpect(jsonPath("$.id").value(savedTransaction.getId()))
            .andExpect(jsonPath("$.transactionAmount").value(savedTransaction.getTransactionAmount()));

    verify(transactionService, times(1)).saveTransaction(Mockito.any(Transaction.class));
}

@Order(24)
@Test
void CRUD_testUpdateTransaction() throws Exception {
    Long transactionId = 1L;
    Transaction existingTransaction = new Transaction(transactionId, 1L, 1L, new Date(), 100.0);
    Transaction updatedTransaction = new Transaction(transactionId, 1L, 1L, new Date(), 150.0);

    when(transactionService.getTransactionById(transactionId)).thenReturn(existingTransaction);
    when(transactionService.saveTransaction(Mockito.any(Transaction.class))).thenReturn(updatedTransaction);

    mockMvc.perform(put("/api/transactions/{id}", transactionId)
            .contentType(MediaType.APPLICATION_JSON)
            .content(new ObjectMapper().writeValueAsString(updatedTransaction)))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.transactionAmount").value(150.0));

    verify(transactionService, times(1)).saveTransaction(Mockito.any(Transaction.class));
}

@Order(25)
@Test
void CRUD_testDeleteTransaction() throws Exception {
    Long transactionId = 1L;

    doNothing().when(transactionService).deleteTransaction(transactionId);

    mockMvc.perform(delete("/api/transactions/{id}", transactionId))
            .andExpect(status().isNoContent());

    verify(transactionService, times(1)).deleteTransaction(transactionId);
}
@Order(26)
@Test
void PaginateSorting_testPaginateClothingItemsController() throws Exception {
    // Path to the ClothingItemController file
    Path entityFilePath = Paths.get("src/main/java/com/examly/springapp/controller/ClothingItemController.java");

    // Read the content of the entity file as a string
    String entityFileContent = Files.readString(entityFilePath);

    // Check if Pageable exists in the controller for pagination
    assertTrue(entityFileContent.contains("Page<ClothingItem>"), "ClothingItemController should contain Pageable for pagination");
}

@Order(27)
@Test
void PaginateSorting_testPaginateClothingItemsService() throws Exception {
    // Path to the ClothingItemService file
    Path entityFilePath = Paths.get("src/main/java/com/examly/springapp/service/ClothingItemService.java");

    // Read the content of the entity file as a string
    String entityFileContent = Files.readString(entityFilePath);

    // Check if Pageable is being used in the service for pagination
    assertTrue(entityFileContent.contains("Pageable"), "ClothingItemService should contain Pageable for pagination");
}


@Order(28)
@Test
void PaginateSorting_testPaginateUsersController() throws Exception {
    // Path to the UserController file
    Path entityFilePath = Paths.get("src/main/java/com/examly/springapp/controller/UserController.java");

    // Read the content of the entity file as a string
    String entityFileContent = Files.readString(entityFilePath);

    // Check if Pageable exists in the controller for pagination
    assertTrue(entityFileContent.contains("Page<User>"), "UserController should contain Pageable for pagination");
}

@Order(29)
@Test
void PaginateSorting_testPaginateUsersService() throws Exception {
    // Path to the UserService file
    Path entityFilePath = Paths.get("src/main/java/com/examly/springapp/service/UserService.java");

    // Read the content of the entity file as a string
    String entityFileContent = Files.readString(entityFilePath);

    // Check if Pageable is being used in the service for pagination
    assertTrue(entityFileContent.contains("Pageable"), "UserService should contain Pageable for pagination");
}


@Order(30)
@Test
void PaginateSorting_testGetSortedClothingItems() throws Exception {
    // Create clothing items
    ClothingItem clothingItem1 = new ClothingItem();
    clothingItem1.setDescription("Shirt");
    clothingItem1.setSize("M");

    ClothingItem clothingItem2 = new ClothingItem();
    clothingItem2.setDescription("Jeans");
    clothingItem2.setSize("L");

    ClothingItem clothingItem3 = new ClothingItem();
    clothingItem3.setDescription("Jacket");
    clothingItem3.setSize("M");

    // Add items to the list
    List<ClothingItem> clothingItems = Arrays.asList(clothingItem1, clothingItem2, clothingItem3);

    // Sort the clothing items by description
    clothingItems.sort(Comparator.comparing(ClothingItem::getDescription));

    // Mock the ClothingItemService to return the sorted list
    when(clothingItemService.findClothingItemsByDescription(eq(""), any(Pageable.class)))
            .thenReturn(new PageImpl<>(clothingItems));

    // Perform the GET request and verify the response
    mockMvc.perform(get("/api/clothing-items/search?description=&page=0&size=10&sort=description,asc"))
            .andExpect(status().isOk()) // Verify HTTP status is OK
            .andExpect(jsonPath("$.content.length()").value(3)) // Verify the length of the content array
            .andExpect(jsonPath("$.content[0].description").value("Jacket")) // Verify the description of the first item
            .andExpect(jsonPath("$.content[1].description").value("Jeans")) // Verify the second item
            .andExpect(jsonPath("$.content[2].description").value("Shirt")); // Verify the third item

    // Verify the service was called once
    verify(clothingItemService, times(1)).findClothingItemsByDescription(eq(""), any(Pageable.class));
}

@Order(31)
@Test
public void JPQL_testFindUsersByNameEmpty() {
    // Query for users with a non-existent name
    Page<User> result = userRepository.findUsersByName("NonExistentName", Pageable.unpaged());

    // Verify the result is empty
    assertThat(result.getContent()).isEmpty();
}
@Test
public void JPQL_testCreateUserWithClothingItem() {
    // Create and save a ClothingItem
    ClothingItem clothingItem = new ClothingItem();
    clothingItem.setDescription("Shirt");
    clothingItem.setSize("L");

    // Create a User with a unique email
    User user = new User();
    user.setName("Johnny Depp");
    user.setEmail("johnny" + System.currentTimeMillis() + "@example.com");  // Use a timestamp to ensure uniqueness

    // Add ClothingItem to User
    Set<ClothingItem> clothingItems = new HashSet<>();
    clothingItems.add(clothingItem);
    user.setClothingItems(clothingItems);

    // Save the user with the associated ClothingItem
    user = userRepository.save(user);

    // Verify that the user has the ClothingItem
    assertNotNull(user.getId(), "User should be saved and have a valid ID");
    assertTrue(user.getClothingItems().contains(clothingItem), "ClothingItem should be associated with the User");
}




@Order(32)
@Test
public void PaginateSorting_testGetSortedUsers() throws Exception {
    // Create users
    User user1 = new User(1L, "Johnny Depp", "johnny.depp@example.com",new HashSet<>());
    User user2 = new User(2L, "Jane Doe", "jane.doe@example.com",new HashSet<>());

    // Mock the service to return sorted users
    when(userService.findUsersByName(eq("john"), any(Pageable.class)))
            .thenReturn(new PageImpl<>(Arrays.asList(user1, user2)));

    // Perform the GET request to /api/users/search with sorting
    mockMvc.perform(get("/api/users/search?name=john&page=0&size=10&sort=name,asc"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.content[0].name").value("Johnny Depp"))
            .andExpect(jsonPath("$.content[1].name").value("Jane Doe"));

    // Verify the service method was called with the correct parameters
    verify(userService, times(1)).findUsersByName(eq("john"), any(Pageable.class));
}


    // Test for Swagger configuration folder existence
    @Order(36)
    @Test
    public void SwaggerUI_testConfigurationFolder() {
        String directoryPath = "src/main/java/com/examly/springapp/config"; // Replace with the path to your directory
        File directory = new File(directoryPath);
        assertTrue(directory.exists() && directory.isDirectory(), "Swagger configuration folder should exist");
    }

    // Test for Swagger config file existence
    @Order(37)
    @Test
    void SwaggerUI_testSwaggerConfigFile() {
        String filePath = "src/main/java/com/examly/springapp/config/SwaggerConfig.java";
        File file = new File(filePath);
        assertTrue(file.exists() && file.isFile(), "SwaggerConfig.java file should exist in the config folder");
    }

    // Test to check the creation of log folder and log file
    @Order(38)
    @Test
    public void LOG_testLogFolderAndFileCreation() {
        String LOG_FOLDER_PATH = "logs";
        String LOG_FILE_PATH = "logs/application.log";
        // Check if the "logs" folder exists
        File logFolder = new File(LOG_FOLDER_PATH);
        assertTrue(logFolder.exists(), "Log folder should be created");

        // Check if the "application.log" file exists inside the "logs" folder
        File logFile = new File(LOG_FILE_PATH);
        assertTrue(logFile.exists(), "Log file should be created inside 'logs' folder");
    }

    // Test for AOP configuration file existence
    @Order(39)
    @Test
    void AOP_testAOPConfigFile() {
        String filePath = "src/main/java/com/examly/springapp/aspect/LoggingAspect.java";
        File file = new File(filePath);
        assertTrue(file.exists() && file.isFile(), "LoggingAspect.java file should exist in the aspect folder");
    }

    // Test to check if the LoggingAspect class contains "Aspect" annotation
    @Order(40)
    @Test
    void AOP_testAOPConfigFileAspect() throws Exception {
        // Path to the LoggingAspect file
        Path entityFilePath = Paths.get("src/main/java/com/examly/springapp/aspect/LoggingAspect.java");

        // Read the content of the entity file as a string
        String entityFileContent = Files.readString(entityFilePath);

        // Check if @Aspect annotation exists
        assertTrue(entityFileContent.contains("@Aspect"), "LoggingAspect class should contain @Aspect annotation");
    }

    //mapping missed
    @Order(41)
@Test
void Mapping_testEntityHasOneToManyRelation() throws Exception {
    
    Path entityFilePath = Paths.get("src/main/java/com/examly/springapp/model/User.java");

   
    String entityFileContent = Files.readString(entityFilePath);

   
    assertTrue(entityFileContent.contains("@OneToMany"), "Entity should contain @OneToMany annotation");
}

@Order(42)
@Test
void Mapping_testEntityHasManyToOneRelation() throws Exception {
   
    Path entityFilePath = Paths.get("src/main/java/com/examly/springapp/model/ClothingItem.java");

  
    String entityFileContent = Files.readString(entityFilePath);


    assertTrue(entityFileContent.contains("@ManyToOne"), "Entity should contain @ManyToOne annotation");
    
  
    assertTrue(entityFileContent.contains("@JoinColumn"), "Entity should contain @JoinColumn annotation");
}



}
