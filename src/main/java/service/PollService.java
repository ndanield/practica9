package service;

import entities.Poll;

import javax.persistence.*;
import javax.persistence.criteria.CriteriaQuery;
import java.util.List;

public class PollService {
    private static EntityManagerFactory emf;
    private Class<Poll> entityClass;

    public PollService(Class<Poll> entityClass) {
        if(emf == null){
            emf = Persistence.createEntityManagerFactory("Persistence");
        }
        this.entityClass = entityClass;
    }

    public void persist (Poll entity){
        EntityManager em = emf.createEntityManager();

        try{
            em.getTransaction().begin();
            em.persist(entity);
            em.getTransaction().commit();
        }catch (IllegalArgumentException iae){
            System.out.println("The instance" + iae.toString() + "is not an entity. "+ iae.getMessage());
        }catch (EntityExistsException eee) {
            System.out.println("The entity is already persisted. " + eee.getMessage());
        } catch (TransactionRequiredException tre) {
            System.out.println("Error de transaccion: " + tre.getMessage());
        } catch (Exception e) {
            em.getTransaction().rollback();
            throw  e;
        } finally {
            em.close();
        }
    }

    public Poll find(long id) {
        EntityManager em = emf.createEntityManager();
        try {
            return em.find(entityClass, id);
        } catch (IllegalArgumentException iae) {
            System.out.println(iae.getMessage());
        } finally {
            em.close();
        }
        return null;
    }

    public void update(Poll entity) {
        EntityManager em = emf.createEntityManager();
        try {
            em.getTransaction().begin();
            em.merge(entity);
            em.getTransaction().commit();
        }catch (Exception e){
            em.getTransaction().rollback();
            throw  e;
        } finally {
            em.close();
        }
    }

    public void remove(Poll entity) {
        EntityManager em = emf.createEntityManager();
        try {
            em.getTransaction().begin();
            em.remove(em.contains(entity) ? entity : em.merge(entity));
//            em.remove(entity);
            em.getTransaction().commit();
        }catch (Exception ex){
            em.getTransaction().rollback();
            throw  ex;
        } finally {
            em.close();
        }
    }

    public List<Poll> findAll() {
        EntityManager em = emf.createEntityManager();
        try {
            CriteriaQuery<Poll> criteriaQuery = em.getCriteriaBuilder().createQuery(entityClass);
            criteriaQuery.select(criteriaQuery.from(entityClass));
            return em.createQuery(criteriaQuery).getResultList();
        } finally {
            em.close();
        }
    }
}
